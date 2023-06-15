import { Resource, Texture } from '@pixi/core'
import { Spritesheet } from '@pixi/spritesheet'
import { IAssetData, IGraphicAsset, IGraphicAssetCollection } from '@/api'

export interface IAssetManager {
  collections: Map<string, IGraphicAssetCollection>;

  getTexture(name: string): Texture<Resource>;

  setTexture(name: string, texture: Texture<Resource>): void;

  getAsset(name: string): IGraphicAsset;

  getCollection(name: string): IGraphicAssetCollection;

  createCollection(data: IAssetData, spritesheet: Spritesheet): IGraphicAssetCollection;

  downloadAssets(urls: string[], cb: Function): void;

  downloadAsset(url: string, cb: Function): void;
}
