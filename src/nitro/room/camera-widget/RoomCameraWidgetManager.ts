import { Container, Sprite, Texture } from 'pixi.js';
import { Nitro } from '../../Nitro';
import { IEventDispatcher } from './../../../core/events/IEventDispatcher';
import { IGraphicAsset } from './../../../room/object/visualization/utils/IGraphicAsset';
import { TextureUtils } from './../../../room/utils/TextureUtils';
import { RoomCameraWidgetManagerEvent } from './../events/RoomCameraWidgetManagerEvent';
import { RoomCameraWidgetEditorEffect } from './RoomCameraWidgetEditorEffect';
import { RoomCameraWidgetEditorSelectedEffect } from './RoomCameraWidgetEditorSelectedEffect';

export class RoomCameraWidgetManager
{
    private _loaded: boolean;
    private _loadedEffects: Map<string, RoomCameraWidgetEditorEffect>;
    private _events: IEventDispatcher;
    
    constructor(events: IEventDispatcher)
    {
        this._loaded = false;
        this._loadedEffects = new Map();
        this._events = events;
    }

    public initialize(): void
    {
        const urls: string[] = [];

        const imagesUrl = Nitro.instance.getConfiguration<string>('image.library.url') + 'Habbo-Stories/';
        const effects = Nitro.instance.getConfiguration<{ name: string, colorMatrix?: number[], minLevel: number, enabled: boolean }[]>('camera.available.effects');

        for(const effect of effects)
        {
            if(effect.enabled)
            {
                if(!effect.colorMatrix) urls.push(imagesUrl + effect.name + '.png');

                this._loadedEffects.set(effect.name, new RoomCameraWidgetEditorEffect(effect.name, effect.minLevel, effect.colorMatrix));
            }
        }

        Nitro.instance.core.asset.downloadAssets(urls, (status: boolean) =>
            {
                console.log('LOADED', status)
                this._loaded = true;
                this._events.dispatchEvent(new RoomCameraWidgetManagerEvent(RoomCameraWidgetManagerEvent.INITIALIZED));
            });
    }

    public editImage(image: HTMLImageElement, selectedEffects: RoomCameraWidgetEditorSelectedEffect[]): HTMLImageElement
    {
        const container = new Container();
        const texture = Texture.from(image);
        const sprite = new Sprite(texture);

        container.addChild(sprite);

        for(const selectedEffect of selectedEffects)
        {
            if(selectedEffect.effect.colorMatrix.length > 0)
            {
                const filter    = new PIXI.filters.ColorMatrixFilter();

                if(!sprite.filters) sprite.filters = [];
                
                sprite.filters.push(filter);

                filter.matrix   = selectedEffect.effect.colorMatrix;
                filter.alpha    = selectedEffect.alpha;
            }
            else
            {
                const effectAsset = this.getEffectAsset(selectedEffect.effect.name);

                if(!effectAsset) continue;

                const effectSprite = new Sprite(effectAsset.texture);
                effectSprite.alpha = selectedEffect.alpha;
                container.addChild(effectSprite);
            }
        }

        return TextureUtils.generateImage(container);
    }

    public getEffectAsset(name: string): IGraphicAsset | null
    {
        const effect = this._loadedEffects.get(name);

        if(!effect) return null;

        if(effect.colorMatrix.length > 0) return null;

        const imagesUrl = Nitro.instance.getConfiguration<string>('image.library.url') + 'Habbo-Stories/';

        console.log('asset', imagesUrl + effect.name + '.png', Nitro.instance.core.asset.getAsset(imagesUrl + effect.name + '.png'));

        return Nitro.instance.core.asset.getAsset(effect.name + '.png');
    }

    public get loadedEffects(): Map<string, RoomCameraWidgetEditorEffect>
    {
        return this._loadedEffects;
    }

    public get isLoaded(): boolean
    {
        return this._loaded;
    }
}
