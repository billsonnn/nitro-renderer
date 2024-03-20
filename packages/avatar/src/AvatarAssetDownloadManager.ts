import { IAssetManager, IAvatarFigureContainer, IAvatarImageListener } from '@nitrots/api';
import { GetConfiguration } from '@nitrots/configuration';
import { AvatarRenderLibraryEvent, GetEventDispatcher, NitroEvent, NitroEventType } from '@nitrots/events';
import { AvatarAssetDownloadLibrary } from './AvatarAssetDownloadLibrary';
import { AvatarStructure } from './AvatarStructure';

export class AvatarAssetDownloadManager
{
    private _assets: IAssetManager;
    private _structure: AvatarStructure;

    private _missingMandatoryLibs: string[] = [];
    private _figureMap: Map<string, AvatarAssetDownloadLibrary[]> = new Map();
    private _figureListeners: Map<string, IAvatarImageListener[]> = new Map();
    private _incompleteFigures: Map<string, AvatarAssetDownloadLibrary[]> = new Map();
    private _currentDownloads: AvatarAssetDownloadLibrary[] = [];
    private _libraryNames: string[] = [];

    constructor(assets: IAssetManager, structure: AvatarStructure)
    {
        this._assets = assets;
        this._structure = structure;
    }

    public async init(): Promise<void>
    {
        this._missingMandatoryLibs = GetConfiguration().getValue<string[]>('avatar.mandatory.libraries');

        const url = GetConfiguration().getValue<string>('avatar.figuremap.url');

        if(!url || !url.length) throw new Error('Invalid figure map url');

        const response = await fetch(url);

        if(response.status !== 200) throw new Error('Invalid figure map file');

        const responseData = await response.json();

        this.processFigureMap(responseData.libraries);

        GetEventDispatcher().addEventListener(NitroEventType.AVATAR_ASSET_DOWNLOADED, (event: AvatarRenderLibraryEvent) => this.onLibraryLoaded(event));

        await this.processMissingLibraries();
    }

    private processFigureMap(data: any): void
    {
        if(!data) return;

        const downloadUrl = GetConfiguration().getValue<string>('avatar.asset.url');

        for(const library of data)
        {
            if(!library) continue;

            const libraryName = (library.id as string);
            const revision = (library.revision || '');

            if(this._libraryNames.indexOf(libraryName) >= 0) continue;

            this._libraryNames.push(libraryName);

            const downloadLibrary = new AvatarAssetDownloadLibrary(libraryName, revision, downloadUrl, this._assets);

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

    private async processMissingLibraries(): Promise<void>
    {
        const promises: Promise<void>[] = [];

        this._missingMandatoryLibs.forEach(value =>
        {
            const libraries = this._figureMap.get(value);

            if(libraries) for(const library of libraries) promises.push(library.downloadAsset());
        });

        this._missingMandatoryLibs = [];

        await Promise.all(promises);
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

                GetEventDispatcher().dispatchEvent(new NitroEvent(NitroEventType.AVATAR_ASSET_LOADED));
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

    public isAvatarFigureContainerReady(container: IAvatarFigureContainer): boolean
    {
        return !this.getAvatarFigurePendingLibraries(container).length;
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

                library.downloadAsset();
            }
        }
        else
        {
            if(listener && !listener.disposed) listener.resetFigure(figure);
        }
    }
}
