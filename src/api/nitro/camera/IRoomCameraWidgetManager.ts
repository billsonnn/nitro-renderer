import { Resource, Texture } from '@pixi/core';
import { IEventDispatcher } from '../../common';
import { IRoomCameraWidgetEffect } from './IRoomCameraWidgetEffect';
import { IRoomCameraWidgetSelectedEffect } from './IRoomCameraWidgetSelectedEffect';

export interface IRoomCameraWidgetManager
{
    init(): void;
    applyEffects(texture: Texture<Resource>, selectedEffects: IRoomCameraWidgetSelectedEffect[], isZoomed: boolean): HTMLImageElement;
    events: IEventDispatcher;
    effects: Map<string, IRoomCameraWidgetEffect>;
    isLoaded: boolean;
}
