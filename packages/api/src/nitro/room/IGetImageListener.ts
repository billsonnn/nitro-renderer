import { IImageResult } from './IImageResult';

export interface IGetImageListener
{
    imageReady(result: IImageResult): void;
    imageFailed(id: number): void;
}
