import { IAssetManager, IAvatarFigureContainer, IAvatarImageListener, INitroEvent, NitroConfiguration, NitroLogger } from '../../api';
import { EventDispatcher } from '../../core';
import { AvatarRenderEvent, AvatarRenderLibraryEvent, NitroEvent } from '../../events';
import { AvatarAssetDownloadLibrary } from './AvatarAssetDownloadLibrary';
import { AvatarStructure } from './AvatarStructure';

export class AvatarAssetDownloadManager extends EventDispatcher
{
    public static DOWNLOADER_READY: string = 'AADM_DOWNLOADER_READY';
    public static LIBRARY_LOADED: string = 'AADM_LIBRARY_LOADED';

    private static MAX_DOWNLOADS: number = 2;

    private _assets: IAssetManager;
    private _structure: AvatarStructure;

    private _missingMandatoryLibs: string[];
    private _figureMap: Map<string, AvatarAssetDownloadLibrary[]>;
    private _pendingContainers: [IAvatarFigureContainer, IAvatarImageListener][];
    private _figureListeners: Map<string, IAvatarImageListener[]>;
    private _incompleteFigures: Map<string, AvatarAssetDownloadLibrary[]>;
    private _pendingDownloadQueue: AvatarAssetDownloadLibrary[];
    private _currentDownloads: AvatarAssetDownloadLibrary[];
    private _libraryNames: string[];
    private _isReady: boolean;

    constructor(assets: IAssetManager, structure: AvatarStructure)
    {
        super();

        this._assets = assets;
        this._structure = structure;

        this._missingMandatoryLibs = NitroConfiguration.getValue<string[]>('avatar.mandatory.libraries');
        this._figureMap = new Map();
        this._pendingContainers = [];
        this._figureListeners = new Map();
        this._incompleteFigures = new Map();
        this._pendingDownloadQueue = [];
        this._currentDownloads = [];
        this._libraryNames = [];
        this._isReady = false;

        this.onLibraryLoaded = this.onLibraryLoaded.bind(this);
        this.onAvatarRenderReady = this.onAvatarRenderReady.bind(this);

        this.loadFigureMap();

        this._structure.renderManager.events.addEventListener(AvatarRenderEvent.AVATAR_RENDER_READY, this.onAvatarRenderReady);
    }

    private loadFigureMap(): void
    {
        const request = new XMLHttpRequest();

        try
        {
            request.open('GET', NitroConfiguration.getValue<string>('avatar.figuremap.url'));

            request.send();

            request.onloadend = e =>
            {
                if(request.responseText)
                {
                    const data = JSON.parse(request.responseText);

                    this.processFigureMap(data.libraries);

                    this.processMissingLibraries();

                    this._isReady = true;

                    this.dispatchEvent(new NitroEvent(AvatarAssetDownloadManager.DOWNLOADER_READY));
                }
            };

            request.onerror = e =>
            {
                throw new Error('invalid_avatar_figure_map');
            };
        }

        catch (e)
        {
            NitroLogger.error(e);
        }
    }

    private processFigureMap(data: any): void
    {
        if(!data) return;

        for(const library of data)
        {
            if(!library) continue;

            const id = (library.id as string);
            const revision = (library.revision || '');

            if(this._libraryNames.indexOf(id) >= 0) continue;

            this._libraryNames.push(id);

            const downloadLibrary = new AvatarAssetDownloadLibrary(id, revision, this._assets, NitroConfiguration.getValue<string>('avatar.asset.url'));

            downloadLibrary.addEventListener(AvatarRenderLibraryEvent.DOWNLOAD_COMPLETE, this.onLibraryLoaded);

            for(const part of library.parts)
            {
                const id = (part.id as string);
                const type = (part.type as string);
                const partString = (type + ':' + id);

                let existing = this._figureMap.get(partString);

                if(!existing) existing = [];

                existing.push(downloadLibrary);

                this._figureMap.set(partString, existing);
            }
        }
    }

    private onAvatarRenderReady(event: INitroEvent): void
    {
        if(!event) return;

        for(const [container, listener] of this._pendingContainers)
        {
            this.downloadAvatarFigure(container, listener);
        }

        this._pendingContainers = [];
    }

    private onLibraryLoaded(event: AvatarRenderLibraryEvent): void
    {
        if(!event || !event.library) return;

        const loadedFigures: string[] = [];

        for(const [figure, libraries] of this._incompleteFigures.entries())
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
                loadedFigures.push(figure);

                const listeners = this._figureListeners.get(figure);

                if(listeners)
                {
                    for(const listener of listeners)
                    {
                        if(!listener || listener.disposed) continue;

                        listener.resetFigure(figure);
                    }
                }

                this._figureListeners.delete(figure);

                this.dispatchEvent(new NitroEvent(AvatarAssetDownloadManager.LIBRARY_LOADED));
            }
        }

        for(const figure of loadedFigures)
        {
            if(!figure) continue;

            this._incompleteFigures.delete(figure);
        }

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

            const map = this._figureMap.get(library);

            if(map) for(const avatar of map) avatar && this.downloadLibrary(avatar);
        }
    }

    public isAvatarFigureContainerReady(container: IAvatarFigureContainer): boolean
    {
        if(!this._isReady || !this._structure.renderManager.isReady)
        {
            return false;
        }

        const pendingLibraries = this.getAvatarFigurePendingLibraries(container);

        return !pendingLibraries.length;
    }

    private getAvatarFigurePendingLibraries(container: IAvatarFigureContainer): AvatarAssetDownloadLibrary[]
    {
        const pendingLibraries: AvatarAssetDownloadLibrary[] = [];

        if(!container || !this._structure) return pendingLibraries;

        const figureData = this._structure.figureData;

        if(!figureData) return pendingLibraries;

        const setKeys = container.getPartTypeIds();

        for(const key of setKeys)
        {
            const set = figureData.getSetType(key);

            if(!set) continue;

            const figurePartSet = set.getPartSet(container.getPartSetId(key));

            if(!figurePartSet) continue;

            for(const part of figurePartSet.parts)
            {
                if(!part) continue;

                const name = (part.type + ':' + part.id);
                const existing = this._figureMap.get(name);

                if(existing === undefined) continue;

                for(const library of existing)
                {
                    if(!library || library.isLoaded) continue;

                    if(pendingLibraries.indexOf(library) >= 0) continue;

                    pendingLibraries.push(library);
                }
            }
        }

        return pendingLibraries;
    }

    public downloadAvatarFigure(container: IAvatarFigureContainer, listener: IAvatarImageListener): void
    {
        if(!this._isReady || !this._structure.renderManager.isReady)
        {
            this._pendingContainers.push([container, listener]);

            return;
        }

        const figure = container.getFigureString();
        const pendingLibraries = this.getAvatarFigurePendingLibraries(container);

        if(pendingLibraries && pendingLibraries.length)
        {
            if(listener && !listener.disposed)
            {
                let listeners = this._figureListeners.get(figure);

                if(!listeners)
                {
                    listeners = [];

                    this._figureListeners.set(figure, listeners);
                }

                listeners.push(listener);
            }

            this._incompleteFigures.set(figure, pendingLibraries);

            for(const library of pendingLibraries)
            {
                if(!library) continue;

                this.downloadLibrary(library);
            }
        }
        else
        {
            if(listener && !listener.disposed) listener.resetFigure(figure);
        }
    }

    private downloadLibrary(library: AvatarAssetDownloadLibrary): void
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
