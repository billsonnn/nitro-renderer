import { RenderTexture } from '@pixi/core'
import { Rectangle } from '@pixi/math'
import { IObjectVisualizationData, IRoomGeometry, IRoomObject } from '@/api'

export interface IRoomObjectVisualization {
  instanceId: number;
  object: IRoomObject;
  image: RenderTexture;
  updateSpriteCounter: number;

  initialize(data: IObjectVisualizationData): boolean;

  dispose(): void;

  update(geometry: IRoomGeometry, time: number, update: boolean, skipUpdate: boolean): void;

  getBoundingRectangle(): Rectangle;

  getImage(bgColor: number, originalId: number): RenderTexture;
}
