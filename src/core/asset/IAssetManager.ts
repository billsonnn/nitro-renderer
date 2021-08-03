
import { Resource, Texture } from '@pixi/core';
import { Spritesheet } from '@pixi/spritesheet';
import { IGraphicAsset } from '../../room/object/visualization/utils/IGraphicAsset';
import { IGraphicAssetCollection } from '../../room/object/visualization/utils/IGraphicAssetCollection';
import { IAssetData } from './interfaces';

export interface IAssetManager
{
    dispose(): void;
    getTexture(name: string): Texture<Resource>;
    setTexture(name: string, texture: Texture<Resource>): void;
    getAsset(name: string): IGraphicAsset;
    getCollection(name: string): IGraphicAssetCollection;
    createCollection(data: IAssetData, spritesheet: Spritesheet): IGraphicAssetCollection;
    downloadAssets(urls: string[], cb: Function): void;
    downloadAsset(url: string, cb: Function): void;
    collections: Map<string, IGraphicAssetCollection>;
}
