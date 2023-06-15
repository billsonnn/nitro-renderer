import { Resource, Texture } from '@pixi/core'
import { IEventDispatcher, IRoomCameraWidgetEffect, IRoomCameraWidgetSelectedEffect } from '@/api'

export interface IRoomCameraWidgetManager {
  events: IEventDispatcher;
  effects: Map<string, IRoomCameraWidgetEffect>;
  isLoaded: boolean;

  init(): void;

  applyEffects(texture: Texture<Resource>, selectedEffects: IRoomCameraWidgetSelectedEffect[], isZoomed: boolean): HTMLImageElement;
}
