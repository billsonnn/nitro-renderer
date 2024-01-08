import { BLEND_MODES, ColorMatrix, ColorMatrixFilter, Container, Filter, Texture } from 'pixi.js';
import { IRoomCameraWidgetEffect, IRoomCameraWidgetManager, IRoomCameraWidgetSelectedEffect, NitroConfiguration } from '../../api';
import { NitroEventDispatcher, RoomCameraWidgetManagerEvent } from '../../events';
import { NitroSprite, TextureUtils } from '../../pixi-proxy';
import { RoomCameraWidgetEffect } from './RoomCameraWidgetEffect';

export class RoomCameraWidgetManager implements IRoomCameraWidgetManager
{
    private _effects: Map<string, IRoomCameraWidgetEffect>;
    private _isLoaded: boolean;

    constructor()
    {
        this._effects = new Map();
        this._isLoaded = false;
    }

    public init(): void
    {
        if(this._isLoaded) return;

        this._isLoaded = true;

        const imagesUrl = NitroConfiguration.getValue<string>('image.library.url') + 'Habbo-Stories/';
        const effects = NitroConfiguration.getValue<{ name: string, colorMatrix?: ColorMatrix, minLevel: number, blendMode?: BLEND_MODES, enabled: boolean }[]>('camera.available.effects');

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

        NitroEventDispatcher.dispatchEvent(new RoomCameraWidgetManagerEvent(RoomCameraWidgetManagerEvent.INITIALIZED));
    }

    public async applyEffects(texture: Texture, selectedEffects: IRoomCameraWidgetSelectedEffect[], isZoomed: boolean): Promise<HTMLImageElement>
    {
        const container = new Container();
        const sprite = new NitroSprite(texture);

        container.addChild(sprite);

        if(isZoomed) sprite.scale.set(2);

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

                (sprite.filters as Filter[]).push(filter);
            }
            else
            {
                const effectSprite = new NitroSprite(effect.texture);
                effectSprite.alpha = selectedEffect.alpha;
                effectSprite.blendMode = effect.blendMode;

                container.addChild(effectSprite);
            }
        }

        return await TextureUtils.generateImage(container);
    }

    public get effects(): Map<string, IRoomCameraWidgetEffect>
    {
        return this._effects;
    }

    public get isLoaded(): boolean
    {
        return this._isLoaded;
    }
}
