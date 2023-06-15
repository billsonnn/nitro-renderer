import { IEventDispatcher } from '@/api'

export interface IAvatarAssetDownloadLibrary extends IEventDispatcher {
  readonly libraryName: string;
  readonly isLoaded: boolean;

  downloadAsset(): void;
}
