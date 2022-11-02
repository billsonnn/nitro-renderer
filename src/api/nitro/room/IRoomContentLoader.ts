import { Resource, Texture } from '@pixi/core';
import { IPetColorResult, IRoomContentListener } from '.';
import { IGraphicAssetCollection, IGraphicAssetGifCollection } from '../../asset';
import { IEventDispatcher } from '../../common';
import { IRoomObject } from '../../room';
import { ISessionDataManager } from '../session';

export interface IRoomContentLoader
{
    dispose: () => void;
    initialize(events: IEventDispatcher): void;
    setSessionDataManager(sessionData: ISessionDataManager): void;
    downloadAsset(type: string, events: IEventDispatcher): void;
    isLoaderType(type: string): boolean;
    getCollection(name: string): IGraphicAssetCollection;
    getPlaceholderName(type: string): string;
    getCategoryForType(type: string): number;
    setRoomObjectRoomId(object: IRoomObject, roomId: string): void;
    getFurnitureFloorNameForTypeId(typeId: number): string;
    getFurnitureWallNameForTypeId(typeId: number, extra?: string): string;
    getFurnitureFloorColorIndex(typeId: number): number;
    getFurnitureWallColorIndex(typeId: number): number;
    getImage(name: string): HTMLImageElement;
    getAssetIconUrl(type: string, colorIndex: string): string;
    addAssetToCollection(collectionName: string, assetName: string, texture: Texture<Resource>, override?: boolean): boolean;
    getPetNameForType(type: number): string;
    downloadImage(id: number, type: string, param: string, events?: IEventDispatcher): boolean;
    getRoomObjectAdUrl(type: string): string;
    getPetColorResult(petIndex: number, paletteIndex: number): IPetColorResult;
    getPetColorResultsForTag(petIndex: number, tagName: string): IPetColorResult[];
    setIconListener(listener: IRoomContentListener): void;
    createGifCollection(collectionName: string, textures: Texture<Resource>[], durations: number[]): IGraphicAssetGifCollection;
    getGifCollection(name: string): IGraphicAssetGifCollection;
}
