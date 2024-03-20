export interface IAvatarAssetDownloadLibrary
{
    downloadAsset(): Promise<void>;
    readonly libraryName: string;
    readonly isLoaded: boolean;
}
