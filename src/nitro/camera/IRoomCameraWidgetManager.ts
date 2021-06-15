import { IEventDispatcher } from '../../core';
import { IRoomCameraWidgetEffect } from './IRoomCameraWidgetEffect';
import { IRoomCameraWidgetSelectedEffect } from './IRoomCameraWidgetSelectedEffect';

export interface IRoomCameraWidgetManager
{
    init(): void;
    applyEffects(image: HTMLImageElement, selectedEffects: IRoomCameraWidgetSelectedEffect[]): HTMLImageElement;
    events: IEventDispatcher;
    effects: Map<string, IRoomCameraWidgetEffect>;
    isLoaded: boolean;
}
