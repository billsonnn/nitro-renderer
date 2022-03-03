import { Texture } from '@pixi/core';
import { ColorMatrix, ColorMatrixFilter } from '@pixi/filter-color-matrix';
import { EventDispatcher, IEventDispatcher, NitroContainer, NitroSprite } from '../../core';
import { TextureUtils } from '../../room';
import { Nitro } from '../Nitro';
import { RoomCameraWidgetManagerEvent } from './events/RoomCameraWidgetManagerEvent';
import { IRoomCameraWidgetEffect } from './IRoomCameraWidgetEffect';
import { IRoomCameraWidgetManager } from './IRoomCameraWidgetManager';
import { IRoomCameraWidgetSelectedEffect } from './IRoomCameraWidgetSelectedEffect';
import { RoomCameraWidgetEffect } from './RoomCameraWidgetEffect';

export class RoomCameraWidgetManager implements IRoomCameraWidgetManager
{
    private _effects: Map<string, IRoomCameraWidgetEffect>;
    private _events: IEventDispatcher;
    private _isLoaded: boolean;

    constructor()
    {
        this._effects = new Map();
        this._events = new EventDispatcher();
        this._isLoaded = false;
    }

    public init(): void
    {
        if(this._isLoaded) return;

        this._isLoaded = true;

        const imagesUrl = Nitro.instance.getConfiguration<string>('image.library.url') + 'Habbo-Stories/';
        const effects = Nitro.instance.getConfiguration<{ name: string, colorMatrix?: ColorMatrix, minLevel: number, blendMode?: number, enabled: boolean }[]>('camera.available.effects');

        for(const effect of effects)
        {
            if(!effect.enabled) continue;

            const cameraEffect = new RoomCameraWidgetEffect(effect.name, effect.minLevel);

            if(effect.colorMatrix.length)
            {
                cameraEffect.colorMatrix = effect.colorMatrix;
            }
            else
            {
                cameraEffect.texture = Texture.from(imagesUrl + effect.name + '.png');
                cameraEffect.blendMode = effect.blendMode;
            }

            this._effects.set(cameraEffect.name, cameraEffect);
        }

        this.events.dispatchEvent(new RoomCameraWidgetManagerEvent(RoomCameraWidgetManagerEvent.INITIALIZED));
    }

    public applyEffects(texture: Texture, selectedEffects: IRoomCameraWidgetSelectedEffect[], isZoomed: boolean): HTMLImageElement
    {
        const container = new NitroContainer();
        const sprite = new NitroSprite(texture);

        container.addChild(sprite);

        for(const selectedEffect of selectedEffects)
        {
            const effect = selectedEffect.effect;

            if(!effect) continue;

            if(effect.colorMatrix)
            {
                const filter = new ColorMatrixFilter();

                filter.matrix = effect.colorMatrix;
                filter.alpha = selectedEffect.alpha;

                if(!sprite.filters) sprite.filters = [];

                sprite.filters.push(filter);
            }
            else
            {
                const effectSprite = new NitroSprite(effect.texture);
                effectSprite.alpha = selectedEffect.alpha;
                effectSprite.blendMode = effect.blendMode;

                container.addChild(effectSprite);
            }
        }

        return TextureUtils.generateImage(container);
    }

    public get effects(): Map<string, IRoomCameraWidgetEffect>
    {
        return this._effects;
    }

    public get events(): IEventDispatcher
    {
        return this._events;
    }

    public get isLoaded(): boolean
    {
        return this._isLoaded;
    }
}
