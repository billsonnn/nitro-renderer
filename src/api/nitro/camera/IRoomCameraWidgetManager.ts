import { Texture } from 'pixi.js';
import { IRoomCameraWidgetEffect } from './IRoomCameraWidgetEffect';
import { IRoomCameraWidgetSelectedEffect } from './IRoomCameraWidgetSelectedEffect';

export interface IRoomCameraWidgetManager
{
    init(): void;
    applyEffects(texture: Texture, selectedEffects: IRoomCameraWidgetSelectedEffect[], isZoomed: boolean): Promise<HTMLImageElement>;
    effects: Map<string, IRoomCameraWidgetEffect>;
    isLoaded: boolean;
}
