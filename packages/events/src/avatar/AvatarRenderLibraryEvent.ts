import { IAvatarAssetDownloadLibrary } from '@nitrots/api';
import { NitroEvent } from '../core';

export class AvatarRenderLibraryEvent extends NitroEvent
{
    public static DOWNLOAD_COMPLETE: string = 'ARLE_DOWNLOAD_COMPLETE';

    private _library: IAvatarAssetDownloadLibrary;

    constructor(type: string, library: IAvatarAssetDownloadLibrary)
    {
        super(type);

        this._library = library;
    }

    public get library(): IAvatarAssetDownloadLibrary
    {
        return this._library;
    }
}
