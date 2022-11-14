
import { Resource, Texture } from '@pixi/core';
import { Spritesheet } from '@pixi/spritesheet';
import { IAssetData } from './IAssetData';
import { IGraphicAsset } from './IGraphicAsset';
import { IGraphicAssetCollection } from './IGraphicAssetCollection';

export interface IAssetManager
{
    getTexture(name: string): Texture<Resource>;
    setTexture(name: string, texture: Texture<Resource>): void;
    getAsset(name: string): IGraphicAsset;
    getCollection(name: string): IGraphicAssetCollection;
    createCollection(data: IAssetData, spritesheet: Spritesheet): IGraphicAssetCollection;
    downloadAssets(urls: string[]): Promise<boolean>;
    downloadAsset(url: string): Promise<boolean>;
    collections: Map<string, IGraphicAssetCollection>;
}
