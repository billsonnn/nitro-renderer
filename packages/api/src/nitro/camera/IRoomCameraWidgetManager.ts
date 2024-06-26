import { Texture } from 'pixi.js';
import { IRoomCameraWidgetEffect } from './IRoomCameraWidgetEffect';
import { IRoomCameraWidgetSelectedEffect } from './IRoomCameraWidgetSelectedEffect';

export interface IRoomCameraWidgetManager
{
    init(): Promise<void>;
    applyEffects(texture: Texture, effects: IRoomCameraWidgetSelectedEffect[], isZoomed: boolean): Promise<HTMLImageElement>;
    effects: Map<string, IRoomCameraWidgetEffect>;
    isLoaded: boolean;
}
