import { IRoomRendererBase } from './IRoomRendererBase';
import { IRoomRenderingCanvas } from './IRoomRenderingCanvas';

export interface IRoomRenderer extends IRoomRendererBase
{
    getCanvas(id: number): IRoomRenderingCanvas;
    createCanvas(id: number, width: number, height: number, scale: number): IRoomRenderingCanvas;
    roomObjectVariableAccurateZ: string;
}