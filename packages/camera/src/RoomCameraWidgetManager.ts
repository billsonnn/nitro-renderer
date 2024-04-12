import { IRoomCameraWidgetEffect, IRoomCameraWidgetManager, IRoomCameraWidgetSelectedEffect } from '@nitrots/api';
import { GetAssetManager } from '@nitrots/assets';
import { GetConfiguration } from '@nitrots/configuration';
import { GetEventDispatcher, RoomCameraWidgetManagerEvent } from '@nitrots/events';
import { TextureUtils } from '@nitrots/utils';
import { BLEND_MODES, ColorMatrix, ColorMatrixFilter, Container, Sprite, Texture } from 'pixi.js';
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

    public async init(): Promise<void>
    {
        if(this._isLoaded) return;

        this._isLoaded = true;

        const imagesUrl = GetConfiguration().getValue<string>('image.library.url') + 'Habbo-Stories/';
        const effects = GetConfiguration().getValue<{ name: string, colorMatrix?: ColorMatrix, minLevel: number, blendMode?: BLEND_MODES, enabled: boolean }[]>('camera.available.effects');

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
                const url = `${ imagesUrl }${ effect.name }.png`;

                await GetAssetManager().downloadAsset(url);

                cameraEffect.texture = GetAssetManager().getTexture(url);
                cameraEffect.blendMode = effect.blendMode;
            }

            this._effects.set(cameraEffect.name, cameraEffect);
        }

        GetEventDispatcher().dispatchEvent(new RoomCameraWidgetManagerEvent(RoomCameraWidgetManagerEvent.INITIALIZED));
    }

    public async applyEffects(texture: Texture, selectedEffects: IRoomCameraWidgetSelectedEffect[], isZoomed: boolean): Promise<HTMLImageElement>
    {
        const container = new Container();
        const sprite = new Sprite(texture);

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

                if(sprite.filters === undefined || sprite.filters === null)
                {
                    sprite.filters = [filter];
                }
                else if(Array.isArray(sprite.filters))
                {
                    sprite.filters = [...sprite.filters, filter];
                }
                else
                {
                    sprite.filters = [sprite.filters, filter];
                }
            }
            else
            {
                const effectSprite = new Sprite(effect.texture);
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
