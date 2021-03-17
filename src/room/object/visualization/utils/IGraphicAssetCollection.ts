import { Texture } from 'pixi.js';
import { IAssetData } from '../../../../core/asset/interfaces';
import { GraphicAssetPalette } from './GraphicAssetPalette';
import { IGraphicAsset } from './IGraphicAsset';

export interface IGraphicAssetCollection
{
    dispose(): void;
    addReference(): void;
    removeReference(): void;
    define(data: IAssetData): void;
    getAsset(name: string): IGraphicAsset;
    getAssetWithPalette(name: string, paletteName: string): IGraphicAsset;
    getPaletteNames(): string[];
    getPaletteColors(paletteName: string): number[];
    getPalette(name: string): GraphicAssetPalette;
    addAsset(name: string, texture: Texture, override: boolean, x?: number, y?: number, flipH?: boolean, flipV?: boolean): boolean;
    disposeAsset(name: string): void;
    referenceCount: number;
    referenceTimestamp: number;
    name: string;
    data: IAssetData;
}