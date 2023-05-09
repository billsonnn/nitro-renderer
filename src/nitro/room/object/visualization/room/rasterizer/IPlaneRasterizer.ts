import { RenderTexture } from '@pixi/core';
import { IVector3D } from '../../../../../../api';
import { PlaneTextureCache } from '../../../../../../pixi-proxy';
import { PlaneBitmapData } from '../utils';
import { PlaneVisualizationLayer } from './basic';

export interface IPlaneRasterizer
{
    initializeDimensions(_arg_1: number, _arg_2: number): boolean;
    render(planeId: string, textureCache: PlaneTextureCache, canvas: RenderTexture, id: string, width: number, height: number, scale: number, normal: IVector3D, useTexture: boolean, offsetX?: number, offsetY?: number, maxX?: number, maxY?: number, timeSinceStartMs?: number): PlaneBitmapData;
    getTextureIdentifier(_arg_1: number, _arg_2: IVector3D): string;
    getLayers(_arg_1: string): PlaneVisualizationLayer[];
    reinitialize(): void;
}
