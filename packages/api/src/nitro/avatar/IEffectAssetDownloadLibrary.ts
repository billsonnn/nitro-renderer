import { IAssetAnimation } from '../../asset';

export interface IEffectAssetDownloadLibrary
{
    downloadAsset(): void;
    readonly libraryName: string;
    readonly animation: { [index: string]: IAssetAnimation };
    readonly isLoaded: boolean;
}
