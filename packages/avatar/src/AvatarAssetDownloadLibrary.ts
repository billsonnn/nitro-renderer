import { IAssetManager, IAvatarAssetDownloadLibrary } from '@nitrots/api';
import { AvatarRenderLibraryEvent, GetEventDispatcher, NitroEventType } from '@nitrots/events';

export class AvatarAssetDownloadLibrary implements IAvatarAssetDownloadLibrary
{
    private static NOT_LOADED: number = 0;
    private static LOADING: number = 1;
    private static LOADED: number = 2;

    private _state: number = AvatarAssetDownloadLibrary.NOT_LOADED;
    private _libraryName: string;
    private _revision: string;
    private _downloadUrl: string;
    private _assetManager: IAssetManager;

    constructor(libraryName: string, revision: string, downloadUrl: string, assetManager: IAssetManager)
    {
        this._libraryName = libraryName;
        this._revision = revision;
        this._downloadUrl = downloadUrl;
        this._assetManager = assetManager;

        this._downloadUrl = this._downloadUrl.replace(/%libname%/gi, this._libraryName);
        this._downloadUrl = this._downloadUrl.replace(/%revision%/gi, this._revision);

        this.checkIsLoaded();
    }

    public async downloadAsset(): Promise<void>
    {
        if(!this._assetManager || (this._state === AvatarAssetDownloadLibrary.LOADING) || (this._state === AvatarAssetDownloadLibrary.LOADED)) return;

        if(!this.checkIsLoaded())
        {
            this._state = AvatarAssetDownloadLibrary.LOADING;

            const status = await this._assetManager.downloadAsset(this._downloadUrl);

            if(!status) throw new Error('Could not download asset');
        }

        if(this.checkIsLoaded()) GetEventDispatcher().dispatchEvent(new AvatarRenderLibraryEvent(NitroEventType.AVATAR_ASSET_DOWNLOADED, this));
    }

    private checkIsLoaded(): boolean
    {
        const asset = this._assetManager.getCollection(this._libraryName);

        if(!asset) return false;

        this._state = AvatarAssetDownloadLibrary.LOADED;

        return true;
    }

    public get libraryName(): string
    {
        return this._libraryName;
    }

    public get isLoaded(): boolean
    {
        return (this._state === AvatarAssetDownloadLibrary.LOADED);
    }
}
