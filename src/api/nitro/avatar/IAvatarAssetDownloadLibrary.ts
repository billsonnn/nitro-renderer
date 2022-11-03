import { IEventDispatcher } from '../../common';

export interface IAvatarAssetDownloadLibrary extends IEventDispatcher
{
    downloadAsset(): void;
    readonly libraryName: string;
    readonly isLoaded: boolean;
}
