import { IAssetManager, IAvatarEffectListener } from '@nitrots/api';
import { GetConfiguration } from '@nitrots/configuration';
import { AvatarRenderEffectLibraryEvent, GetEventDispatcher, NitroEvent, NitroEventType } from '@nitrots/events';
import { AvatarStructure } from './AvatarStructure';
import { EffectAssetDownloadLibrary } from './EffectAssetDownloadLibrary';

export class EffectAssetDownloadManager
{
    private _assets: IAssetManager;
    private _structure: AvatarStructure;

    private _missingMandatoryLibs: string[] = [];
    private _effectMap: Map<string, EffectAssetDownloadLibrary[]> = new Map();
    private _effectListeners: Map<string, IAvatarEffectListener[]> = new Map();
    private _incompleteEffects: Map<string, EffectAssetDownloadLibrary[]> = new Map();
    private _currentDownloads: EffectAssetDownloadLibrary[] = [];
    private _libraryNames: string[] = [];

    constructor(assets: IAssetManager, structure: AvatarStructure)
    {
        this._assets = assets;
        this._structure = structure;
    }

    public async init(): Promise<void>
    {
        this._missingMandatoryLibs = GetConfiguration().getValue<string[]>('avatar.mandatory.effect.libraries');

        const url = GetConfiguration().getValue<string>('avatar.effectmap.url');

        if(!url || !url.length) throw new Error('Invalid effect map url');

        const response = await fetch(url);

        if(response.status !== 200) throw new Error('Invalid effect map file');

        const responseData = await response.json();

        this.processEffectMap(responseData.effects);

        GetEventDispatcher().addEventListener(NitroEventType.AVATAR_EFFECT_DOWNLOADED, (event: AvatarRenderEffectLibraryEvent) => this.onLibraryLoaded(event));

        await this.processMissingLibraries();
    }

    private processEffectMap(data: any): void
    {
        if(!data) return;

        const downloadUrl = GetConfiguration().getValue<string>('avatar.asset.effect.url');

        for(const effect of data)
        {
            if(!effect) continue;

            const id = (effect.id as string);
            const libraryName = (effect.lib as string);
            const revision = (effect.revision || '');

            if(this._libraryNames.indexOf(libraryName) >= 0) continue;

            this._libraryNames.push(libraryName);

            const downloadLibrary = new EffectAssetDownloadLibrary(libraryName, revision, downloadUrl, this._assets);

            let existing = this._effectMap.get(id);

            if(!existing) existing = [];

            existing.push(downloadLibrary);

            this._effectMap.set(id, existing);
        }
    }

    private async processMissingLibraries(): Promise<void>
    {
        const promises: Promise<void>[] = [];

        this._missingMandatoryLibs.forEach(value =>
        {
            const libraries = this._effectMap.get(value);

            if(libraries) for(const library of libraries) promises.push(library.downloadAsset());
        });

        this._missingMandatoryLibs = [];

        await Promise.all(promises);
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

                GetEventDispatcher().dispatchEvent(new NitroEvent(NitroEventType.AVATAR_EFFECT_LOADED));
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

    public isAvatarEffectReady(effect: number): boolean
    {
        return !this.getAvatarEffectPendingLibraries(effect).length;
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

    public downloadAvatarEffect(id: number, listener: IAvatarEffectListener): void
    {
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

                library.downloadAsset();
            }
        }
        else
        {
            if(listener && !listener.disposed) listener.resetEffect(id);
        }
    }
}
