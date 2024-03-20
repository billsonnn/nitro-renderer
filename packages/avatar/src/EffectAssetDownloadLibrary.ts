import { IAssetAnimation, IAssetManager, IEffectAssetDownloadLibrary } from '@nitrots/api';
import { AvatarRenderEffectLibraryEvent, GetEventDispatcher, NitroEventType } from '@nitrots/events';

export class EffectAssetDownloadLibrary implements IEffectAssetDownloadLibrary
{
    public static DOWNLOAD_COMPLETE: string = 'EADL_DOWNLOAD_COMPLETE';

    private static NOT_LOADED: number = 0;
    private static LOADING: number = 1;
    private static LOADED: number = 2;

    private _state: number = EffectAssetDownloadLibrary.NOT_LOADED;
    private _libraryName: string;
    private _revision: string;
    private _downloadUrl: string;
    private _assetManager: IAssetManager;
    private _animation: { [index: string]: IAssetAnimation } = null;

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
        if(!this._assetManager || (this._state === EffectAssetDownloadLibrary.LOADING) || (this._state === EffectAssetDownloadLibrary.LOADED)) return;

        if(!this.checkIsLoaded())
        {
            this._state = EffectAssetDownloadLibrary.LOADING;

            const status = await this._assetManager.downloadAsset(this._downloadUrl);

            if(!status) throw new Error('Could not download asset');
        }

        if(this.checkIsLoaded()) GetEventDispatcher().dispatchEvent(new AvatarRenderEffectLibraryEvent(NitroEventType.AVATAR_EFFECT_DOWNLOADED, this));
    }

    private checkIsLoaded(): boolean
    {
        const asset = this._assetManager.getCollection(this._libraryName);

        if(!asset) return false;

        this._state = EffectAssetDownloadLibrary.LOADED;

        this._animation = asset.data.animations;

        return true;
    }

    public get libraryName(): string
    {
        return this._libraryName;
    }

    public get animation(): { [index: string]: IAssetAnimation }
    {
        return this._animation;
    }

    public get isLoaded(): boolean
    {
        return (this._state === EffectAssetDownloadLibrary.LOADED);
    }
}
