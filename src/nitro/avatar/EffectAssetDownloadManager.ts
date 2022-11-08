import { IAssetManager, IAvatarEffectListener, INitroEvent, NitroConfiguration, NitroLogger } from '../../api';
import { EventDispatcher } from '../../core';
import { AvatarRenderEffectLibraryEvent, AvatarRenderEvent, NitroEvent } from '../../events';
import { AvatarStructure } from './AvatarStructure';
import { EffectAssetDownloadLibrary } from './EffectAssetDownloadLibrary';

export class EffectAssetDownloadManager extends EventDispatcher
{
    public static DOWNLOADER_READY: string = 'EADM_DOWNLOADER_READY';
    public static LIBRARY_LOADED: string = 'EADM_LIBRARY_LOADED';

    private static MAX_DOWNLOADS: number = 2;

    private _assets: IAssetManager;
    private _structure: AvatarStructure;

    private _missingMandatoryLibs: string[];
    private _effectMap: Map<string, EffectAssetDownloadLibrary[]>;
    private _initDownloadBuffer: [number, IAvatarEffectListener][];
    private _effectListeners: Map<string, IAvatarEffectListener[]>;
    private _incompleteEffects: Map<string, EffectAssetDownloadLibrary[]>;
    private _pendingDownloadQueue: EffectAssetDownloadLibrary[];
    private _currentDownloads: EffectAssetDownloadLibrary[];
    private _libraryNames: string[];
    private _isReady: boolean;

    constructor(assets: IAssetManager, structure: AvatarStructure)
    {
        super();

        this._assets = assets;
        this._structure = structure;

        this._missingMandatoryLibs = NitroConfiguration.getValue<string[]>('avatar.mandatory.effect.libraries');
        this._effectMap = new Map();
        this._effectListeners = new Map();
        this._incompleteEffects = new Map();
        this._initDownloadBuffer = [];
        this._pendingDownloadQueue = [];
        this._currentDownloads = [];
        this._libraryNames = [];
        this._isReady = false;

        this.onLibraryLoaded = this.onLibraryLoaded.bind(this);
        this.onAvatarRenderReady = this.onAvatarRenderReady.bind(this);

        this.loadEffectMap();

        this._structure.renderManager.events.addEventListener(AvatarRenderEvent.AVATAR_RENDER_READY, this.onAvatarRenderReady);
    }

    private loadEffectMap(): void
    {
        const request = new XMLHttpRequest();

        try
        {
            request.open('GET', NitroConfiguration.getValue<string>('avatar.effectmap.url'));

            request.send();

            request.onloadend = e =>
            {
                if(request.responseText)
                {
                    const data = JSON.parse(request.responseText);

                    this.processEffectMap(data.effects);

                    this.processMissingLibraries();

                    this._isReady = true;

                    this.dispatchEvent(new NitroEvent(EffectAssetDownloadManager.DOWNLOADER_READY));
                }
            };

            request.onerror = e =>
            {
                throw new Error('invalid_avatar_effect_map');
            };
        }

        catch (e)
        {
            NitroLogger.error(e);
        }
    }

    private processEffectMap(data: any): void
    {
        if(!data) return;

        for(const effect of data)
        {
            if(!effect) continue;

            const id = (effect.id as string);
            const lib = (effect.lib as string);
            const revision = (effect.revision || '');

            if(this._libraryNames.indexOf(lib) >= 0) continue;

            this._libraryNames.push(lib);

            const downloadLibrary = new EffectAssetDownloadLibrary(lib, revision, this._assets, NitroConfiguration.getValue<string>('avatar.asset.effect.url'));

            downloadLibrary.addEventListener(AvatarRenderEffectLibraryEvent.DOWNLOAD_COMPLETE, this.onLibraryLoaded);

            let existing = this._effectMap.get(id);

            if(!existing) existing = [];

            existing.push(downloadLibrary);

            this._effectMap.set(id, existing);
        }
    }

    public downloadAvatarEffect(id: number, listener: IAvatarEffectListener): void
    {
        if(!this._isReady || !this._structure.renderManager.isReady)
        {
            this._initDownloadBuffer.push([id, listener]);

            return;
        }

        const pendingLibraries = this.getAvatarEffectPendingLibraries(id);

        if(pendingLibraries && pendingLibraries.length)
        {
            if(listener && !listener.disposed)
            {
                let listeners = this._effectListeners.get(id.toString());

                if(!listeners) listeners = [];

                listeners.push(listener);

                this._effectListeners.set(id.toString(), listeners);
            }

            this._incompleteEffects.set(id.toString(), pendingLibraries);

            for(const library of pendingLibraries)
            {
                if(!library) continue;

                this.downloadLibrary(library);
            }
        }
        else
        {
            if(listener && !listener.disposed) listener.resetEffect(id);
        }
    }

    private onAvatarRenderReady(event: INitroEvent): void
    {
        if(!event) return;

        for(const [id, listener] of this._initDownloadBuffer)
        {
            this.downloadAvatarEffect(id, listener);
        }

        this._initDownloadBuffer = [];
    }

    private onLibraryLoaded(event: AvatarRenderEffectLibraryEvent): void
    {
        if(!event || !event.library) return;

        const loadedEffects: string[] = [];

        this._structure.registerAnimation(event.library.animation);

        for(const [id, libraries] of this._incompleteEffects.entries())
        {
            let isReady = true;

            for(const library of libraries)
            {
                if(!library || library.isLoaded) continue;

                isReady = false;

                break;
            }

            if(isReady)
            {
                loadedEffects.push(id);

                const listeners = this._effectListeners.get(id);

                for(const listener of listeners)
                {
                    if(!listener || listener.disposed) continue;

                    listener.resetEffect(parseInt(id));
                }

                this._effectListeners.delete(id);

                this.dispatchEvent(new NitroEvent(EffectAssetDownloadManager.LIBRARY_LOADED));
            }
        }

        for(const id of loadedEffects) this._incompleteEffects.delete(id);

        let index = 0;

        while(index < this._currentDownloads.length)
        {
            const download = this._currentDownloads[index];

            if(download)
            {
                if(download.libraryName === event.library.libraryName) this._currentDownloads.splice(index, 1);
            }

            index++;
        }
    }

    public processMissingLibraries(): void
    {
        const libraries = this._missingMandatoryLibs.slice();

        for(const library of libraries)
        {
            if(!library) continue;

            const map = this._effectMap.get(library);

            if(map) for(const effect of map) effect && this.downloadLibrary(effect);
        }
    }

    public isAvatarEffectReady(effect: number): boolean
    {
        if(!this._isReady || !this._structure.renderManager.isReady)
        {
            return false;
        }

        const pendingLibraries = this.getAvatarEffectPendingLibraries(effect);

        return !pendingLibraries.length;
    }

    private getAvatarEffectPendingLibraries(id: number): EffectAssetDownloadLibrary[]
    {
        const pendingLibraries: EffectAssetDownloadLibrary[] = [];

        if(!this._structure) return pendingLibraries;

        const libraries = this._effectMap.get(id.toString());

        if(libraries)
        {
            for(const library of libraries)
            {
                if(!library || library.isLoaded) continue;

                if(pendingLibraries.indexOf(library) === -1) pendingLibraries.push(library);
            }
        }

        return pendingLibraries;
    }

    private downloadLibrary(library: EffectAssetDownloadLibrary): void
    {
        if(!library || library.isLoaded) return;

        if((this._pendingDownloadQueue.indexOf(library) >= 0) || (this._currentDownloads.indexOf(library) >= 0)) return;

        this._pendingDownloadQueue.push(library);

        this.processDownloadQueue();
    }

    private processDownloadQueue(): void
    {
        while(this._pendingDownloadQueue.length)
        {
            const library = this._pendingDownloadQueue[0];

            library.downloadAsset();

            this._currentDownloads.push(this._pendingDownloadQueue.shift());
        }
    }
}
