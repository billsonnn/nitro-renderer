import { IRoomCameraWidgetEffect, IRoomCameraWidgetManager, IRoomCameraWidgetSelectedEffect } from '@nitrots/api';
import { GetAssetManager } from '@nitrots/assets';
import { GetConfiguration } from '@nitrots/configuration';
import { GetEventDispatcher, RoomCameraWidgetManagerEvent } from '@nitrots/events';
import { TextureUtils } from '@nitrots/utils';
import { BLEND_MODES, ColorMatrix, ColorMatrixFilter, Container, Filter, Sprite, Texture } from 'pixi.js';
import { RoomCameraWidgetEffect } from './RoomCameraWidgetEffect';

export class RoomCameraWidgetManager implements IRoomCameraWidgetManager
{
    private _effects: Map<string, IRoomCameraWidgetEffect> = new Map();
    private _isLoaded: boolean = false;

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

    public async applyEffects(texture: Texture, effects: IRoomCameraWidgetSelectedEffect[], isZoomed: boolean): Promise<HTMLImageElement>
    {
        const container = new Container();
        const sprite = new Sprite(texture);

        container.addChild(sprite);

        if(isZoomed) sprite.scale.set(2);

        const filters: Filter[] = [];

        const getColorMatrixFilter = (matrix: ColorMatrix, flag: boolean, strength: number): ColorMatrixFilter =>
        {
            const filter = new ColorMatrixFilter();

            if(flag)
            {
                filter.matrix = matrix;
            }
            else
            {
                //@ts-ignore
                const newMatrix: ColorMatrix = [];
                const otherMatrix: ColorMatrix = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];

                for(let i = 0; i < matrix.length; i++)
                {
                    newMatrix.push((matrix[i] * strength) + (otherMatrix[i] * (1 - strength)));
                }

                filter.matrix = newMatrix;
            }

            return filter;
        };

        for(const selectedEffect of effects)
        {
            const effect = selectedEffect.effect;

            if(!effect) continue;

            if(effect.colorMatrix)
            {
                const filter = getColorMatrixFilter(effect.colorMatrix, false, selectedEffect.strength);

                filters.push(filter);
            }
            else
            {
                const effectSprite = new Sprite(effect.texture);

                effectSprite.alpha = selectedEffect.strength;
                effectSprite.blendMode = effect.blendMode;

                container.addChild(effectSprite);
            }
        }

        container.filters = filters;

        return await TextureUtils.generateImage(sprite);
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
