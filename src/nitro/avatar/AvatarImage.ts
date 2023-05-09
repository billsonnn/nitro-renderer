import { RenderTexture, Texture } from '@pixi/core';
import { Container } from '@pixi/display';
import { ColorMatrixFilter } from '@pixi/filter-color-matrix';
import { Rectangle } from '@pixi/math';
import { Sprite } from '@pixi/sprite';
import { AdvancedMap, AvatarAction, AvatarDirectionAngle, AvatarScaleType, AvatarSetType, IActionDefinition, IActiveActionData, IAdvancedMap, IAnimationLayerData, IAvatarDataContainer, IAvatarEffectListener, IAvatarFigureContainer, IAvatarImage, IGraphicAsset, IPartColor, ISpriteDataContainer } from '../../api';
import { GetTickerTime, NitroContainer, NitroSprite, PaletteMapFilter, PixiApplicationProxy, TextureUtils } from '../../pixi-proxy';
import { ActiveActionData } from './actions';
import { AssetAliasCollection } from './alias';
import { AvatarFigureContainer } from './AvatarFigureContainer';
import { AvatarStructure } from './AvatarStructure';
import { AvatarImageCache } from './cache';
import { EffectAssetDownloadManager } from './EffectAssetDownloadManager';

export class AvatarImage implements IAvatarImage, IAvatarEffectListener
{
    private static CHANNELS_EQUAL: string = 'CHANNELS_EQUAL';
    private static CHANNELS_UNIQUE: string = 'CHANNELS_UNIQUE';
    private static CHANNELS_RED: string = 'CHANNELS_RED';
    private static CHANNELS_GREEN: string = 'CHANNELS_GREEN';
    private static CHANNELS_BLUE: string = 'CHANNELS_BLUE';
    private static CHANNELS_DESATURATED: string = 'CHANNELS_DESATURATED';
    private static DEFAULT_ACTION: string = 'Default';
    private static DEFAULT_DIRECTION: number = 2;
    private static DEFAULT_AVATAR_SET: string = AvatarSetType.FULL;

    protected _structure: AvatarStructure;
    protected _scale: string;
    protected _mainDirection: number;
    protected _headDirection: number;
    protected _mainAction: IActiveActionData;
    protected _disposed: boolean;
    protected _canvasOffsets: number[];
    protected _assets: AssetAliasCollection;
    protected _cache: AvatarImageCache;
    protected _figure: AvatarFigureContainer;
    protected _avatarSpriteData: IAvatarDataContainer;
    protected _actions: ActiveActionData[];
    protected _image: RenderTexture;
    protected _reusableTexture: RenderTexture;

    private _defaultAction: IActiveActionData;
    private _frameCounter: number = 0;
    private _directionOffset: number = 0;
    private _changes: boolean;
    private _sprites: ISpriteDataContainer[];
    private _isAnimating: boolean = false;
    private _animationHasResetOnToggle: boolean = false;
    private _actionsSorted: boolean = false;
    private _sortedActions: IActiveActionData[];
    private _lastActionsString: string;
    private _currentActionsString: string;
    private _fullImageCache: IAdvancedMap<string, RenderTexture>;
    private _fullImageCacheSize: number = 5;
    protected _isCachedImage: boolean = false;
    private _useFullImageCache: boolean = false;
    private _effectIdInUse: number = -1;
    private _animationFrameCount: number;
    private _cachedBodyParts: string[];
    private _cachedBodyPartsDirection: number = -1;
    private _cachedBodyPartsGeometryType: string = null;
    private _cachedBodyPartsAvatarSet: string = null;
    private _effectManager: EffectAssetDownloadManager;
    private _effectListener: IAvatarEffectListener;

    constructor(k: AvatarStructure, _arg_2: AssetAliasCollection, _arg_3: AvatarFigureContainer, _arg_4: string, _arg_5: EffectAssetDownloadManager, _arg_6: IAvatarEffectListener = null)
    {
        this._canvasOffsets = [];
        this._actions = [];
        this._cachedBodyParts = [];
        this._changes = true;
        this._disposed = false;
        this._effectManager = _arg_5;
        this._structure = k;
        this._assets = _arg_2;
        this._scale = _arg_4;
        this._effectListener = _arg_6;
        if(this._scale == null)
        {
            this._scale = AvatarScaleType.LARGE;
        }
        if(_arg_3 == null)
        {
            _arg_3 = new AvatarFigureContainer('hr-893-45.hd-180-2.ch-210-66.lg-270-82.sh-300-91.wa-2007-.ri-1-');
        }
        this._figure = _arg_3;
        this._cache = new AvatarImageCache(this._structure, this, this._assets, this._scale);
        this.setDirection(AvatarImage.DEFAULT_AVATAR_SET, AvatarImage.DEFAULT_DIRECTION);
        this._actions = [];
        this._defaultAction = new ActiveActionData(AvatarAction.POSTURE_STAND);
        this._defaultAction.definition = this._structure.getActionDefinition(AvatarImage.DEFAULT_ACTION);
        this.resetActions();
        this._fullImageCache = new AdvancedMap();
        this._animationFrameCount = 0;
    }

    public getServerRenderData(): any[]
    {
        this.getAvatarPartsForCamera(AvatarSetType.FULL);

        return this._cache.getServerRenderData();
    }

    public dispose(): void
    {
        if(this._disposed) return;

        this._structure = null;
        this._assets = null;
        this._mainAction = null;
        this._figure = null;
        this._avatarSpriteData = null;
        this._actions = null;

        if(this._image)
        {
            this._image.destroy();

            this._image = null;
        }

        if(this._cache)
        {
            this._cache.dispose();
            this._cache = null;
        }

        if(this._fullImageCache)
        {
            for(const k of this._fullImageCache.getValues()) (k && k.destroy());

            this._fullImageCache = null;
        }

        this._image = null;
        this._canvasOffsets = null;
        this._disposed = true;
    }

    public get disposed(): boolean
    {
        return this._disposed;
    }

    public getFigure(): IAvatarFigureContainer
    {
        return this._figure;
    }

    public getScale(): string
    {
        return this._scale;
    }

    public getPartColor(k: string): IPartColor
    {
        return this._structure.getPartColor(this._figure, k);
    }

    public setDirection(k: string, _arg_2: number): void
    {
        _arg_2 = (_arg_2 + this._directionOffset);

        if(_arg_2 < AvatarDirectionAngle.MIN_DIRECTION)
        {
            _arg_2 = (AvatarDirectionAngle.MAX_DIRECTION + (_arg_2 + 1));
        }

        if(_arg_2 > AvatarDirectionAngle.MAX_DIRECTION)
        {
            _arg_2 = (_arg_2 - (AvatarDirectionAngle.MAX_DIRECTION + 1));
        }

        if(this._structure.isMainAvatarSet(k))
        {
            this._mainDirection = _arg_2;
        }

        if((k === AvatarSetType.HEAD) || (k === AvatarSetType.FULL))
        {
            if((k === AvatarSetType.HEAD) && (this.isHeadTurnPreventedByAction()))
            {
                _arg_2 = this._mainDirection;
            }

            this._headDirection = _arg_2;
        }

        this._cache.setDirection(k, _arg_2);
        this._changes = true;
    }

    public setDirectionAngle(k: string, _arg_2: number): void
    {
        this.setDirection(k, Math.floor(_arg_2 / 45));
    }

    public getSprites(): ISpriteDataContainer[]
    {
        return this._sprites;
    }

    public getCanvasOffsets(): number[]
    {
        return this._canvasOffsets;
    }

    public getLayerData(k: ISpriteDataContainer): IAnimationLayerData
    {
        return this._structure.getBodyPartData(k.animation.id, this._frameCounter, k.id);
    }

    public updateAnimationByFrames(k: number = 1): void
    {
        this._frameCounter += k;
        this._changes = true;
    }

    public resetAnimationFrameCounter(): void
    {
        this._frameCounter = 0;
        this._changes = true;
    }

    private getFullImageCacheKey(): string
    {
        if(!this._useFullImageCache) return null;

        if(((this._sortedActions.length == 1) && (this._mainDirection == this._headDirection)))
        {
            return (this._mainDirection + this._currentActionsString) + (this._frameCounter % 4);
        }

        if(this._sortedActions.length == 2)
        {
            for(const k of this._sortedActions)
            {
                if(((k.actionType == 'fx') && ((((k.actionParameter == '33') || (k.actionParameter == '34')) || (k.actionParameter == '35')) || (k.actionParameter == '36'))))
                {
                    return (this._mainDirection + this._currentActionsString) + 0;
                }

                if(((k.actionType == 'fx') && ((k.actionParameter == '38') || (k.actionParameter == '39'))))
                {
                    return (((this._mainDirection + '_') + this._headDirection) + this._currentActionsString) + (this._frameCounter % 11);
                }

                if((k.actionType === 'dance') && ((k.actionParameter === '1') || (k.actionParameter === '2') || (k.actionParameter === '3') || (k.actionParameter === '4')))
                {
                    let frame = (this._frameCounter % 8);

                    if((k.actionParameter === '3')) frame = (this._frameCounter % 10);

                    if((k.actionParameter === '4')) frame = (this._frameCounter % 16);

                    return (((this._mainDirection + k.actionType) + k.actionParameter) + frame);
                }
            }
        }

        return null;
    }

    private getBodyParts(k: string, _arg_2: string, _arg_3: number): string[]
    {
        if((((!(_arg_3 == this._cachedBodyPartsDirection)) || (!(_arg_2 == this._cachedBodyPartsGeometryType))) || (!(k == this._cachedBodyPartsAvatarSet))))
        {
            this._cachedBodyPartsDirection = _arg_3;
            this._cachedBodyPartsGeometryType = _arg_2;
            this._cachedBodyPartsAvatarSet = k;
            this._cachedBodyParts = this._structure.getBodyParts(k, _arg_2, _arg_3);
        }
        return this._cachedBodyParts;
    }

    public getAvatarPartsForCamera(k: string): void
    {
        let _local_4: string;
        if(this._mainAction == null)
        {
            return;
        }
        const _local_2 = this._structure.getCanvas(this._scale, this._mainAction.definition.geometryType);
        if(_local_2 == null)
        {
            return;
        }
        const _local_3 = this.getBodyParts(k, this._mainAction.definition.geometryType, this._mainDirection);
        let _local_6 = (_local_3.length - 1);
        while(_local_6 >= 0)
        {
            _local_4 = _local_3[_local_6];
            const _local_5 = this._cache.getImageContainer(_local_4, this._frameCounter, true);
            _local_6--;
        }
    }

    public getImage(setType: string, hightlight: boolean, scale: number = 1, cache: boolean = true): RenderTexture
    {
        if(!this._changes) return this._image;

        if(!this._mainAction) return null;

        if(!this._actionsSorted) this.endActionAppends();

        const avatarCanvas = this._structure.getCanvas(this._scale, this._mainAction.definition.geometryType);

        if(!avatarCanvas) return null;

        if(this._image && ((this._image.width !== avatarCanvas.width) || (this._image.height !== avatarCanvas.height)))
        {
            if(this._reusableTexture)
            {
                this._reusableTexture.destroy(true);

                this._reusableTexture = null;
            }

            this._image = null;
            this._isCachedImage = false;
        }

        const _local_6 = this.getBodyParts(setType, this._mainAction.definition.geometryType, this._mainDirection);

        this._image = null;

        const container = new NitroContainer();

        let isCachable = true;
        let partCount = (_local_6.length - 1);

        while(partCount >= 0)
        {
            const set = _local_6[partCount];
            const part = this._cache.getImageContainer(set, this._frameCounter);

            if(part)
            {
                const partCacheContainer = part.image;

                if(!partCacheContainer)
                {
                    container.destroy({
                        children: true
                    });

                    return null;
                }

                isCachable = ((isCachable) && (part.isCacheable));

                const point = part.regPoint.clone();

                if(point)
                {
                    point.x += avatarCanvas.offset.x;
                    point.y += avatarCanvas.offset.y;

                    point.x += avatarCanvas.regPoint.x;
                    point.y += avatarCanvas.regPoint.y;

                    const partContainer = new NitroContainer();

                    partContainer.addChild(partCacheContainer);

                    if(partContainer)
                    {
                        partContainer.position.set(point.x, point.y);

                        container.addChild(partContainer);
                    }
                }
            }

            partCount--;
        }

        if(this._avatarSpriteData)
        {
            if(!container.filters) container.filters = [];

            if(this._avatarSpriteData.colorTransform) container.filters.push(this._avatarSpriteData.colorTransform);

            if(this._avatarSpriteData.paletteIsGrayscale)
            {
                this.convertToGrayscale(container);

                container.filters.push(new PaletteMapFilter(this._avatarSpriteData.reds, PaletteMapFilter.CHANNEL_RED));
            }
        }

        if(!cache)
        {
            return TextureUtils.generateTexture(container, new Rectangle(0, 0, avatarCanvas.width, avatarCanvas.height));
        }

        if(this._reusableTexture)
        {
            PixiApplicationProxy.instance.renderer.render(container, {
                renderTexture: this._reusableTexture,
                clear: true
            });

            //@ts-ignore
            this._reusableTexture.baseTexture.hitMap = null;
        }
        else
        {
            this._reusableTexture = TextureUtils.generateTexture(container, new Rectangle(0, 0, avatarCanvas.width, avatarCanvas.height));
        }

        if(!this._reusableTexture) return null;

        /*
        if(this._avatarSpriteData)
        {
            if(this._avatarSpriteData.paletteIsGrayscale)
            {
                this._reusableTexture = this.applyPalette(this._reusableTexture, this._avatarSpriteData.reds, [], []);
            }
        }
        */

        this._image = this._reusableTexture;
        this._changes = false;

        return this._image;
    }

    public applyPalette(texture: RenderTexture, reds: number[] = [], greens: number[] = [], blues: number[] = []): RenderTexture
    {
        const textureCanvas = TextureUtils.generateCanvas(texture);
        const textureCtx = textureCanvas.getContext('2d');
        const textureImageData = textureCtx.getImageData(0, 0, textureCanvas.width, textureCanvas.height);
        const data = textureImageData.data;

        for(let i = 0; i < data.length; i += 4)
        {
            if(reds.length == 256)
            {
                let paletteColor = reds[data[i]];
                if(paletteColor === undefined) paletteColor = 0;

                data[i] = ((paletteColor >> 16) & 0xFF);
                data[i + 1] = ((paletteColor >> 8) & 0xFF);
                data[i + 2] = (paletteColor & 0xFF);
            }

            if(greens.length == 256)
            {
                let paletteColor = greens[data[i + 1]];
                if(paletteColor === undefined) paletteColor = 0;

                data[i] = ((paletteColor >> 16) & 0xFF);
                data[i + 1] = ((paletteColor >> 8) & 0xFF);
                data[i + 2] = (paletteColor & 0xFF);
            }
            if(blues.length == 256)
            {
                let paletteColor = greens[data[i + 2]];
                if(paletteColor === undefined) paletteColor = 0;

                data[i] = ((paletteColor >> 16) & 0xFF);
                data[i + 1] = ((paletteColor >> 8) & 0xFF);
                data[i + 2] = (paletteColor & 0xFF);
            }
        }

        textureCtx.putImageData(textureImageData, 0, 0);

        const newTexture = new Sprite(Texture.from(textureCanvas));

        PixiApplicationProxy.instance.renderer.render(newTexture, {
            renderTexture: texture,
            clear: true
        });

        return texture;
    }

    public getImageAsSprite(setType: string, scale: number = 1): Sprite
    {
        if(!this._mainAction) return null;

        if(!this._actionsSorted) this.endActionAppends();

        const avatarCanvas = this._structure.getCanvas(this._scale, this._mainAction.definition.geometryType);

        if(!avatarCanvas) return null;

        const setTypes = this.getBodyParts(setType, this._mainAction.definition.geometryType, this._mainDirection);
        const container = new NitroSprite();
        const sprite = new NitroSprite(Texture.EMPTY);

        sprite.width = avatarCanvas.width;
        sprite.height = avatarCanvas.height;

        container.addChild(sprite);

        let partCount = (setTypes.length - 1);

        while(partCount >= 0)
        {
            const set = setTypes[partCount];
            const part = this._cache.getImageContainer(set, this._frameCounter);

            if(part)
            {
                const partCacheContainer = part.image;

                if(!partCacheContainer)
                {
                    container.destroy({
                        children: true
                    });

                    return null;
                }

                const point = part.regPoint.clone();

                if(point)
                {
                    point.x += avatarCanvas.offset.x;
                    point.y += avatarCanvas.offset.y;

                    point.x += avatarCanvas.regPoint.x;
                    point.y += avatarCanvas.regPoint.y;

                    const partContainer = new NitroContainer();

                    partContainer.addChild(partCacheContainer);

                    partContainer.position.set(point.x, point.y);

                    container.addChild(partContainer);
                }
            }

            partCount--;
        }

        return container;
    }

    public getCroppedImage(setType: string, scale: number = 1): HTMLImageElement
    {
        if(!this._mainAction) return null;

        if(!this._actionsSorted) this.endActionAppends();

        const avatarCanvas = this._structure.getCanvas(this._scale, this._mainAction.definition.geometryType);

        if(!avatarCanvas) return null;

        const setTypes = this.getBodyParts(setType, this._mainAction.definition.geometryType, this._mainDirection);
        const container = new NitroContainer();

        let partCount = (setTypes.length - 1);

        while(partCount >= 0)
        {
            const set = setTypes[partCount];
            const part = this._cache.getImageContainer(set, this._frameCounter);

            if(part)
            {
                const partCacheContainer = part.image;

                if(!partCacheContainer)
                {
                    container.destroy({
                        children: true
                    });

                    return null;
                }

                const point = part.regPoint.clone();

                if(point)
                {
                    point.x += avatarCanvas.offset.x;
                    point.y += avatarCanvas.offset.y;

                    point.x += avatarCanvas.regPoint.x;
                    point.y += avatarCanvas.regPoint.y;

                    const partContainer = new NitroContainer();

                    partContainer.addChild(partCacheContainer);

                    if(partContainer)
                    {
                        partContainer.position.set(point.x, point.y);

                        container.addChild(partContainer);
                    }
                }
            }

            partCount--;
        }

        const texture = TextureUtils.generateTexture(container, new Rectangle(0, 0, avatarCanvas.width, avatarCanvas.height));

        const image = TextureUtils.generateImage(texture);

        if(!image) return null;

        return image;
    }

    protected getFullImage(k: string): RenderTexture
    {
        const existing = this._fullImageCache.getValue(k);

        if(existing)
        {
            if(!existing.valid)
            {
                this._fullImageCache.remove(k);

                existing.destroy(true);
            }

            return existing;
        }

        return null;
    }

    protected cacheFullImage(k: string, _arg_2: RenderTexture): void
    {
        const existing = this._fullImageCache.getValue(k);

        if(existing)
        {
            this._fullImageCache.remove(k);

            existing.destroy(true);
        }

        if(this._fullImageCache.length === this._fullImageCacheSize)
        {
            const oldestKey = this._fullImageCache.getKey(0);

            if(oldestKey)
            {
                const removed = this._fullImageCache.remove(oldestKey);

                removed.destroy(true);
            }
        }

        this._fullImageCache.add(k, _arg_2);
    }

    public getAsset(k: string): IGraphicAsset
    {
        return this._assets.getAsset(k);
    }

    public getDirection(): number
    {
        return this._mainDirection;
    }

    public initActionAppends(): void
    {
        this._actions = [];
        this._actionsSorted = false;
        this._currentActionsString = '';
        this._useFullImageCache = false;
    }

    public endActionAppends(): void
    {
        let k: ActiveActionData;

        if(!this.sortActions()) return;

        for(const k of this._sortedActions)
        {
            if(k.actionType === AvatarAction.EFFECT)
            {
                if(!this._effectManager.isAvatarEffectReady(parseInt(k.actionParameter))) this._effectManager.downloadAvatarEffect(parseInt(k.actionParameter), this);
            }
        }

        this.resetActions();
        this.setActionsToParts();
    }

    public appendAction(k: string, ..._args: any[]): boolean
    {
        let _local_3 = '';

        this._actionsSorted = false;

        if(_args && (_args.length > 0)) _local_3 = _args[0];

        if((_local_3 !== undefined) && (_local_3 !== null)) _local_3 = _local_3.toString();

        switch(k)
        {
            case AvatarAction.POSTURE:
                switch(_local_3)
                {
                    case AvatarAction.POSTURE_LAY:
                    case AvatarAction.POSTURE_WALK:
                    case AvatarAction.POSTURE_STAND:
                    case AvatarAction.POSTURE_SWIM:
                    case AvatarAction.POSTURE_FLOAT:
                    case AvatarAction.POSTURE_SIT:
                    case AvatarAction.SNOWWAR_RUN:
                    case AvatarAction.SNOWWAR_DIE_FRONT:
                    case AvatarAction.SNOWWAR_DIE_BACK:
                    case AvatarAction.SNOWWAR_PICK:
                    case AvatarAction.SNOWWAR_THROW:
                        if((_local_3 === AvatarAction.POSTURE_LAY) || (_local_3 === AvatarAction.POSTURE_LAY) || (_local_3 === AvatarAction.POSTURE_LAY))
                        {
                            if(_local_3 === AvatarAction.POSTURE_LAY)
                            {
                                if(this._mainDirection == 0)
                                {
                                    this.setDirection(AvatarSetType.FULL, 4);
                                }
                                else
                                {
                                    this.setDirection(AvatarSetType.FULL, 2);
                                }
                            }

                            this._useFullImageCache = true;
                            this._useFullImageCache = true;
                        }

                        this.addActionData(_local_3);
                        break;
                }
                break;
            case AvatarAction.GESTURE:
                switch(_local_3)
                {
                    case AvatarAction.GESTURE_AGGRAVATED:
                    case AvatarAction.GESTURE_SAD:
                    case AvatarAction.GESTURE_SMILE:
                    case AvatarAction.GESTURE_SURPRISED:
                        this.addActionData(_local_3);
                        break;
                }
                break;
            case AvatarAction.EFFECT:
            case AvatarAction.DANCE:
            case AvatarAction.TALK:
            case AvatarAction.EXPRESSION_WAVE:
            case AvatarAction.SLEEP:
            case AvatarAction.SIGN:
            case AvatarAction.EXPRESSION_RESPECT:
            case AvatarAction.EXPRESSION_BLOW_A_KISS:
            case AvatarAction.EXPRESSION_LAUGH:
            case AvatarAction.EXPRESSION_CRY:
            case AvatarAction.EXPRESSION_IDLE:
            case AvatarAction.EXPRESSION_SNOWBOARD_OLLIE:
            case AvatarAction.EXPRESSION_SNOWBORD_360:
            case AvatarAction.EXPRESSION_RIDE_JUMP:
                if(_local_3 === AvatarAction.EFFECT)
                {
                    if((((((_local_3 === '33') || (_local_3 === '34')) || (_local_3 === '35')) || (_local_3 === '36')) || (_local_3 === '38')) || (_local_3 === '39'))
                    {
                        this._useFullImageCache = true;
                    }
                }

                this.addActionData(k, _local_3);
                break;
            case AvatarAction.CARRY_OBJECT:
            case AvatarAction.USE_OBJECT: {
                const _local_4 = this._structure.getActionDefinitionWithState(k);
                if(_local_4) _local_3 = _local_4.getParameterValue(_local_3);
                this.addActionData(k, _local_3);
                break;
            }
        }

        return true;
    }

    protected addActionData(k: string, _arg_2: string = ''): void
    {
        let _local_3: ActiveActionData;
        if(!this._actions) this._actions = [];

        let _local_4 = 0;
        while(_local_4 < this._actions.length)
        {
            _local_3 = this._actions[_local_4];
            if(((_local_3.actionType == k) && (_local_3.actionParameter == _arg_2)))
            {
                return;
            }
            _local_4++;
        }
        this._actions.push(new ActiveActionData(k, _arg_2, this._frameCounter));
    }

    public isAnimating(): boolean
    {
        return (this._isAnimating) || (this._animationFrameCount > 1);
    }

    private resetActions(): boolean
    {
        this._animationHasResetOnToggle = false;
        this._isAnimating = false;
        this._sprites = [];
        this._avatarSpriteData = null;
        this._directionOffset = 0;
        this._structure.removeDynamicItems(this);
        this._mainAction = this._defaultAction;
        this._mainAction.definition = this._defaultAction.definition;
        this.resetBodyPartCache(this._defaultAction);
        return true;
    }

    private isHeadTurnPreventedByAction(): boolean
    {
        let _local_2: IActionDefinition;
        let _local_3: ActiveActionData;
        let k: boolean;
        if(this._sortedActions == null)
        {
            return false;
        }
        for(const _local_3 of this._sortedActions)
        {
            _local_2 = this._structure.getActionDefinitionWithState(_local_3.actionType);
            if(((!(_local_2 == null)) && (_local_2.getPreventHeadTurn(_local_3.actionParameter))))
            {
                k = true;
            }
        }
        return k;
    }

    private sortActions(): boolean
    {
        let _local_2: boolean;
        let _local_3: boolean;
        let _local_4: ActiveActionData;
        let _local_5: number;
        let k: boolean;

        this._currentActionsString = '';
        this._sortedActions = this._structure.sortActions(this._actions);
        this._animationFrameCount = this._structure.maxFrames(this._sortedActions);

        if(!this._sortedActions)
        {
            this._canvasOffsets = [0, 0, 0];

            if(this._lastActionsString !== '')
            {
                k = true;

                this._lastActionsString = '';
            }
        }
        else
        {
            this._canvasOffsets = this._structure.getCanvasOffsets(this._sortedActions, this._scale, this._mainDirection);

            for(const _local_4 of this._sortedActions)
            {
                this._currentActionsString = (this._currentActionsString + (_local_4.actionType + _local_4.actionParameter));

                if(_local_4.actionType === AvatarAction.EFFECT)
                {
                    const _local_5 = parseInt(_local_4.actionParameter);

                    if(this._effectIdInUse !== _local_5) _local_2 = true;

                    this._effectIdInUse = _local_5;

                    _local_3 = true;
                }
            }

            if(!_local_3)
            {
                if(this._effectIdInUse > -1) _local_2 = true;

                this._effectIdInUse = -1;
            }

            if(_local_2) this._cache.disposeInactiveActions(0);

            if(this._lastActionsString != this._currentActionsString)
            {
                k = true;

                this._lastActionsString = this._currentActionsString;
            }
        }

        this._actionsSorted = true;

        return k;
    }

    private setActionsToParts(): void
    {
        if(!this._sortedActions == null) return;

        const _local_3: number = GetTickerTime();
        const _local_4: string[] = [];

        for(const k of this._sortedActions) _local_4.push(k.actionType);

        for(const k of this._sortedActions)
        {
            if((k && k.definition) && k.definition.isAnimation)
            {
                const _local_2 = this._structure.getAnimation(((k.definition.state + '.') + k.actionParameter));

                if(_local_2 && _local_2.hasOverriddenActions())
                {
                    const _local_5 = _local_2.overriddenActionNames();

                    if(_local_5)
                    {
                        for(const _local_6 of _local_5)
                        {
                            if(_local_4.indexOf(_local_6) >= 0) k.overridingAction = _local_2.overridingAction(_local_6);
                        }
                    }
                }

                if(_local_2 && _local_2.resetOnToggle)
                {
                    this._animationHasResetOnToggle = true;
                }
            }
        }

        for(const k of this._sortedActions)
        {
            if(!((!(k)) || (!(k.definition))))
            {
                if(k.definition.isAnimation && (k.actionParameter === '')) k.actionParameter = '1';

                this.setActionToParts(k, _local_3);

                if(k.definition.isAnimation)
                {
                    this._isAnimating = k.definition.isAnimated(k.actionParameter);

                    const _local_2 = this._structure.getAnimation(((k.definition.state + '.') + k.actionParameter));

                    if(_local_2)
                    {
                        this._sprites = this._sprites.concat(_local_2.spriteData);

                        if(_local_2.hasDirectionData()) this._directionOffset = _local_2.directionData.offset;

                        if(_local_2.hasAvatarData()) this._avatarSpriteData = _local_2.avatarData;
                    }
                }
            }
        }
    }

    private setActionToParts(k: IActiveActionData, _arg_2: number): void
    {
        if(((k == null) || (k.definition == null)))
        {
            return;
        }
        if(k.definition.assetPartDefinition == '')
        {
            return;
        }
        if(k.definition.isMain)
        {
            this._mainAction = k;
            this._cache.setGeometryType(k.definition.geometryType);
        }
        this._cache.setAction(k, _arg_2);
        this._changes = true;
    }

    private resetBodyPartCache(k: IActiveActionData): void
    {
        if(!k) return;

        if(k.definition.assetPartDefinition === '') return;

        if(k.definition.isMain)
        {
            this._mainAction = k;
            this._cache.setGeometryType(k.definition.geometryType);
        }

        this._cache.resetBodyPartCache(k);
        this._changes = true;
    }

    public get avatarSpriteData(): IAvatarDataContainer
    {
        return this._avatarSpriteData;
    }

    private convertToGrayscale(container: Container, channel: string = 'CHANNELS_EQUAL'): Container
    {
        let _local_3 = 0.33;
        let _local_4 = 0.33;
        let _local_5 = 0.33;
        const _local_6 = 1;

        switch(channel)
        {
            case AvatarImage.CHANNELS_UNIQUE:
                _local_3 = 0.3;
                _local_4 = 0.59;
                _local_5 = 0.11;
                break;
            case AvatarImage.CHANNELS_RED:
                _local_3 = 1;
                _local_4 = 0;
                _local_5 = 0;
                break;
            case AvatarImage.CHANNELS_GREEN:
                _local_3 = 0;
                _local_4 = 1;
                _local_5 = 0;
                break;
            case AvatarImage.CHANNELS_BLUE:
                _local_3 = 0;
                _local_4 = 0;
                _local_5 = 1;
                break;
            case AvatarImage.CHANNELS_DESATURATED:
                _local_3 = 0.3086;
                _local_4 = 0.6094;
                _local_5 = 0.082;
                break;
        }

        const colorFilter = new ColorMatrixFilter();

        colorFilter.matrix = [_local_3, _local_4, _local_5, 0, 0, _local_3, _local_4, _local_5, 0, 0, _local_3, _local_4, _local_5, 0, 0, 0, 0, 0, 1, 0];

        container.filters.push(colorFilter);

        return container;
    }

    private errorThis(k: string): void
    {
    }

    private logThis(k: string): void
    {
    }

    public isPlaceholder(): boolean
    {
        return false;
    }

    public forceActionUpdate(): void
    {
        this._lastActionsString = '';
    }

    public get animationHasResetOnToggle(): boolean
    {
        return this._animationHasResetOnToggle;
    }

    public get mainAction(): string
    {
        return this._mainAction.actionType;
    }

    public resetEffect(effect: number): void
    {
        if(effect === this._effectIdInUse)
        {
            this.resetActions();
            this.setActionsToParts();

            this._animationHasResetOnToggle = true;
            this._changes = true;

            if(this._effectListener) this._effectListener.resetEffect(effect);
        }
    }
}
