import { IRoomRendererBase, IRoomRenderingCanvas } from '@/api'

export interface IRoomRenderer extends IRoomRendererBase {
  roomObjectVariableAccurateZ: string;

  getCanvas(id: number): IRoomRenderingCanvas;

  createCanvas(id: number, width: number, height: number, scale: number): IRoomRenderingCanvas;
}
