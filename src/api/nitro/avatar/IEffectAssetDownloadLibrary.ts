import { IAssetAnimation } from '../../asset';
import { IEventDispatcher } from '../../common';

export interface IEffectAssetDownloadLibrary extends IEventDispatcher
{
    downloadAsset(): void;
    readonly libraryName: string;
    readonly animation: { [index: string]: IAssetAnimation };
    readonly isLoaded: boolean;
}
