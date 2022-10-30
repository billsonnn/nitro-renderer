import { BaseTexture, Resource, Texture } from '@pixi/core';
import { IAssetData } from './IAssetData';
import { IGraphicAsset } from './IGraphicAsset';
import { IGraphicAssetPalette } from './IGraphicAssetPalette';

export interface IGraphicAssetCollection
{
    dispose(): void;
    addReference(): void;
    removeReference(): void;
    define(data: IAssetData): void;
    getAsset(name: string): IGraphicAsset;
    getAssetWithPalette(name: string, paletteName: string): IGraphicAsset;
    getTexture(name: string): Texture<Resource>;
    getPaletteNames(): string[];
    getPaletteColors(paletteName: string): number[];
    getPalette(name: string): IGraphicAssetPalette;
    addAsset(name: string, texture: Texture<Resource>, override: boolean, x?: number, y?: number, flipH?: boolean, flipV?: boolean): boolean;
    disposeAsset(name: string): void;
    referenceCount: number;
    referenceTimestamp: number;
    name: string;
    baseTexture: BaseTexture;
    data: IAssetData;
}
