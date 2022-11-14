import { IAssetManager, IAvatarAssetDownloadLibrary } from '../../api';
import { EventDispatcher } from '../../core';
import { AvatarRenderLibraryEvent } from '../../events';

export class AvatarAssetDownloadLibrary extends EventDispatcher implements IAvatarAssetDownloadLibrary
{
    public static DOWNLOAD_COMPLETE: string = 'AADL_DOWNLOAD_COMPLETE';

    private static NOT_LOADED: number = 0;
    private static LOADING: number = 1;
    private static LOADED: number = 2;

    private _state: number;
    private _libraryName: string;
    private _revision: string;
    private _downloadUrl: string;
    private _assets: IAssetManager;

    constructor(id: string, revision: string, assets: IAssetManager, assetUrl: string)
    {
        super();

        this._state = AvatarAssetDownloadLibrary.NOT_LOADED;
        this._libraryName = id;
        this._revision = revision;
        this._downloadUrl = assetUrl;
        this._assets = assets;

        this._downloadUrl = this._downloadUrl.replace(/%libname%/gi, this._libraryName);
        this._downloadUrl = this._downloadUrl.replace(/%revision%/gi, this._revision);

        const asset = this._assets.getCollection(this._libraryName);

        if(asset) this._state = AvatarAssetDownloadLibrary.LOADED;
    }

    public async downloadAsset(): Promise<void>
    {
        if(!this._assets || (this._state === AvatarAssetDownloadLibrary.LOADING) || (this._state === AvatarAssetDownloadLibrary.LOADED)) return;

        const asset = this._assets.getCollection(this._libraryName);

        if(asset)
        {
            this._state = AvatarAssetDownloadLibrary.LOADED;

            this.dispatchEvent(new AvatarRenderLibraryEvent(AvatarRenderLibraryEvent.DOWNLOAD_COMPLETE, this));

            return;
        }

        this._state = AvatarAssetDownloadLibrary.LOADING;

        const status = await this._assets.downloadAsset(this._downloadUrl);

        if(!status) return;

        this._state = AvatarAssetDownloadLibrary.LOADED;

        this.dispatchEvent(new AvatarRenderLibraryEvent(AvatarRenderLibraryEvent.DOWNLOAD_COMPLETE, this));
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
