import { NitroEvent } from '../../../core/events/NitroEvent';
import { EffectAssetDownloadLibrary } from '../EffectAssetDownloadLibrary';

export class AvatarRenderEffectLibraryEvent extends NitroEvent
{
    public static DOWNLOAD_COMPLETE: string = 'ARELE_DOWNLOAD_COMPLETE';

    private _library: EffectAssetDownloadLibrary;

    constructor(type: string, library: EffectAssetDownloadLibrary)
    {
        super(type);

        this._library = library;
    }

    public get library(): EffectAssetDownloadLibrary
    {
        return this._library;
    }
}