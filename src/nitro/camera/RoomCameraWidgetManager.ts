import { Container, filters, Sprite, Texture } from 'pixi.js';
import { EventDispatcher, IEventDispatcher } from '../../core';
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
        this._effects   = new Map();
        this._events    = new EventDispatcher();
        this._isLoaded  = false;
    }

    public init(): void
    {
        if(this._isLoaded) return;

        this._isLoaded = true;

        const imagesUrl = Nitro.instance.getConfiguration<string>('image.library.url') + 'Habbo-Stories/';
        const effects   = Nitro.instance.getConfiguration<{ name: string, colorMatrix?: number[], minLevel: number, enabled: boolean }[]>('camera.available.effects');

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
            }

            this._effects.set(cameraEffect.name, cameraEffect);
        }

        this.events.dispatchEvent(new RoomCameraWidgetManagerEvent(RoomCameraWidgetManagerEvent.INITIALIZED));
    }

    public applyEffects(image: HTMLImageElement, selectedEffects: IRoomCameraWidgetSelectedEffect[]): HTMLImageElement
    {
        const container = new Container();
        const texture   = Texture.from(image);
        const sprite    = new Sprite(texture);

        container.addChild(sprite);

        for(const selectedEffect of selectedEffects)
        {
            const effect = selectedEffect.effect;

            if(!effect) continue;

            if(effect.colorMatrix)
            {
                const filter = new filters.ColorMatrixFilter();

                filter.matrix   = effect.colorMatrix;
                filter.alpha    = selectedEffect.alpha;

                if(!sprite.filters) sprite.filters = [ filter ];
            }
            else
            {
                const effectSprite = new Sprite(effect.texture);
                effectSprite.alpha = selectedEffect.alpha;

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
