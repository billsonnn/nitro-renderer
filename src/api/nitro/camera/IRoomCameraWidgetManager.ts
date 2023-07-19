import { Resource, Texture } from '@pixi/core';
import { IRoomCameraWidgetEffect } from './IRoomCameraWidgetEffect';
import { IRoomCameraWidgetSelectedEffect } from './IRoomCameraWidgetSelectedEffect';

export interface IRoomCameraWidgetManager
{
    init(): void;
    applyEffects(texture: Texture<Resource>, selectedEffects: IRoomCameraWidgetSelectedEffect[], isZoomed: boolean): Promise<HTMLImageElement>;
    effects: Map<string, IRoomCameraWidgetEffect>;
    isLoaded: boolean;
}
