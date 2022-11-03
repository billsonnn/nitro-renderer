import { IEffectAssetDownloadLibrary } from '../../api';
import { NitroEvent } from '../core';

export class AvatarRenderEffectLibraryEvent extends NitroEvent
{
    public static DOWNLOAD_COMPLETE: string = 'ARELE_DOWNLOAD_COMPLETE';

    private _library: IEffectAssetDownloadLibrary;

    constructor(type: string, library: IEffectAssetDownloadLibrary)
    {
        super(type);

        this._library = library;
    }

    public get library(): IEffectAssetDownloadLibrary
    {
        return this._library;
    }
}
