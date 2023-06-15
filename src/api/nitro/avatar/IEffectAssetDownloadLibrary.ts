import { IAssetAnimation, IEventDispatcher } from '@/api'

export interface IEffectAssetDownloadLibrary extends IEventDispatcher {
  readonly libraryName: string;
  readonly animation: { [index: string]: IAssetAnimation };
  readonly isLoaded: boolean;

  downloadAsset(): void;
}
