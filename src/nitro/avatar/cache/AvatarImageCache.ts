import { Texture } from '@pixi/core';
import { Matrix, Point, Rectangle } from '@pixi/math';
import { AvatarDirectionAngle, AvatarFigurePartType, AvatarScaleType, GeometryType, IActiveActionData, IAvatarImage, RoomObjectSpriteData } from '../../../api';
import { GetTickerTime, NitroContainer, NitroSprite } from '../../../pixi-proxy';
import { AssetAliasCollection } from '../alias';
import { AvatarAnimationLayerData } from '../animation';
import { AvatarImageBodyPartContainer } from '../AvatarImageBodyPartContainer';
import { AvatarImagePartContainer } from '../AvatarImagePartContainer';
import { AvatarStructure } from '../AvatarStructure';
import { AvatarCanvas } from '../structure';
import { AvatarImageActionCache } from './AvatarImageActionCache';
import { AvatarImageBodyPartCache } from './AvatarImageBodyPartCache';
import { AvatarImageDirectionCache } from './AvatarImageDirectionCache';
import { ImageData } from './ImageData';

export class AvatarImageCache
{
    private static DEFAULT_MAX_CACHE_STORAGE_TIME_MS: number = 60000;

    private _structure: AvatarStructure;
    private _avatar: IAvatarImage;
    private _assets: AssetAliasCollection;
    private _scale: string;
    private _cache: Map<string, AvatarImageBodyPartCache>;
    private _canvas: AvatarCanvas;
    private _disposed: boolean;
    private _geometryType: string;
    private _unionImages: ImageData[];
    private _matrix: Matrix;
    private _serverRenderData: RoomObjectSpriteData[];

    constructor(k: AvatarStructure, _arg_2: IAvatarImage, _arg_3: AssetAliasCollection, _arg_4: string)
    {
        this._structure = k;
        this._avatar = _arg_2;
        this._assets = _arg_3;
        this._scale = _arg_4;
        this._cache = new Map();
        this._canvas = null;
        this._disposed = false;
        this._unionImages = [];
        this._matrix = new Matrix();
        this._serverRenderData = [];
    }

    public dispose(): void
    {
        if(this._disposed) return;

        this._structure = null;
        this._avatar = null;
        this._assets = null;
        this._canvas = null;
        this._disposed = true;

        if(this._cache)
        {
            for(const cache of this._cache.values())
            {
                if(!cache) continue;

                cache.dispose();
            }

            this._cache = null;
        }

        if(this._unionImages)
        {
            for(const image of this._unionImages)
            {
                if(!image) continue;

                image.dispose();
            }

            this._unionImages = [];
        }
    }

    public disposeInactiveActions(k: number = 60000): void
    {
        const time = GetTickerTime();

        if(this._cache)
        {
            for(const cache of this._cache.values())
            {
                if(!cache) continue;

                cache.disposeActions(k, time);
            }
        }
    }

    public resetBodyPartCache(k: IActiveActionData): void
    {
        if(this._cache)
        {
            for(const cache of this._cache.values())
            {
                if(!cache) continue;

                cache.setAction(k, 0);
            }
        }
    }

    public setDirection(k: string, _arg_2: number): void
    {
        const parts = this._structure.getBodyPartsUnordered(k);

        if(parts)
        {
            for(const part of parts)
            {
                const actionCache = this.getBodyPartCache(part);

                if(!actionCache) continue;

                actionCache.setDirection(_arg_2);
            }
        }
    }

    public setAction(k: IActiveActionData, _arg_2: number): void
    {
        const _local_3 = this._structure.getActiveBodyPartIds(k, this._avatar);

        for(const _local_4 of _local_3)
        {
            const _local_5 = this.getBodyPartCache(_local_4);

            if(_local_5) _local_5.setAction(k, _arg_2);
        }
    }

    public setGeometryType(k: string): void
    {
        if(this._geometryType === k) return;

        if((((this._geometryType === GeometryType.SITTING) && (k === GeometryType.VERTICAL)) || ((this._geometryType === GeometryType.VERTICAL) && (k === GeometryType.SITTING)) || ((this._geometryType === GeometryType.SNOWWARS_HORIZONTAL) && (k = GeometryType.SNOWWARS_HORIZONTAL))))
        {
            this._geometryType = k;
            this._canvas = null;

            return;
        }

        this.disposeInactiveActions(0);

        this._geometryType = k;
        this._canvas = null;
    }

    public getImageContainer(k: string, frameNumber: number, _arg_3: boolean = false): AvatarImageBodyPartContainer
    {
        let _local_4 = this.getBodyPartCache(k);

        if(!_local_4)
        {
            _local_4 = new AvatarImageBodyPartCache();

            this._cache.set(k, _local_4);
        }

        let _local_5 = _local_4.getDirection();
        let _local_7 = _local_4.getAction();
        let frameCount = frameNumber;

        if(_local_7.definition.startFromFrameZero) frameCount -= _local_7.startFrame;

        let _local_8 = _local_7;
        let _local_9: string[] = [];
        let _local_10: Map<string, string> = new Map();
        const _local_11 = new Point();

        if(!((!(_local_7)) || (!(_local_7.definition))))
        {
            if(_local_7.definition.isAnimation)
            {
                let _local_15 = _local_5;

                const _local_16 = this._structure.getAnimation(((_local_7.definition.state + '.') + _local_7.actionParameter));
                const _local_17 = (frameNumber - _local_7.startFrame);

                if(_local_16)
                {
                    const _local_18 = _local_16.getLayerData(_local_17, k, _local_7.overridingAction);

                    if(_local_18)
                    {
                        _local_15 = (_local_5 + _local_18.dd);

                        if(_local_18.dd < 0)
                        {
                            if(_local_15 < 0)
                            {
                                _local_15 = (8 + _local_15);
                            }
                            else if(_local_15 > 7) _local_15 = (8 - _local_15);
                        }
                        else
                        {
                            if(_local_15 < 0)
                            {
                                _local_15 = (_local_15 + 8);
                            }
                            else if(_local_15 > 7) _local_15 = (_local_15 - 8);
                        }

                        if(this._scale === AvatarScaleType.LARGE)
                        {
                            _local_11.x = _local_18.dx;
                            _local_11.y = _local_18.dy;
                        }
                        else
                        {
                            _local_11.x = (_local_18.dx / 2);
                            _local_11.y = (_local_18.dy / 2);
                        }

                        frameCount = _local_18.animationFrame;

                        if(_local_18.action)
                        {
                            _local_7 = _local_18.action;
                        }

                        if(_local_18.type === AvatarAnimationLayerData.BODYPART)
                        {
                            if(_local_18.action != null)
                            {
                                _local_8 = _local_18.action;
                            }

                            _local_5 = _local_15;
                        }
                        else if(_local_18.type === AvatarAnimationLayerData.FX) _local_5 = _local_15;

                        _local_10 = _local_18.items;
                    }

                    _local_9 = _local_16.removeData;
                }
            }
        }

        let _local_12 = _local_4.getActionCache(_local_8);

        if(!_local_12 || _arg_3)
        {
            _local_12 = new AvatarImageActionCache();
            _local_4.updateActionCache(_local_8, _local_12);
        }

        let _local_13 = _local_12.getDirectionCache(_local_5);

        if(!_local_13 || _arg_3)
        {
            const _local_19 = this._structure.getParts(k, this._avatar.getFigure(), _local_8, this._geometryType, _local_5, _local_9, this._avatar, _local_10);

            _local_13 = new AvatarImageDirectionCache(_local_19);

            _local_12.updateDirectionCache(_local_5, _local_13);
        }

        let _local_14 = _local_13.getImageContainer(frameCount);

        if(!_local_14 || _arg_3)
        {
            const _local_20 = _local_13.getPartList();

            _local_14 = this.renderBodyPart(_local_5, _local_20, frameCount, _local_7, _arg_3);

            if(_local_14 && !_arg_3)
            {
                if(_local_14.isCacheable) _local_13.updateImageContainer(_local_14, frameCount);
            }
            else
            {
                return null;
            }
        }

        const offset = this._structure.getFrameBodyPartOffset(_local_8, _local_5, frameCount, k);

        _local_11.x += offset.x;
        _local_11.y += offset.y;

        _local_14.offset = _local_11;

        return _local_14;
    }

    public getServerRenderData(): any[]
    {
        this._serverRenderData = [];

        return this._serverRenderData;
    }

    public getBodyPartCache(k: string): AvatarImageBodyPartCache
    {
        let existing = this._cache.get(k);

        if(!existing)
        {
            existing = new AvatarImageBodyPartCache();

            this._cache.set(k, existing);
        }

        return existing;
    }

    private renderBodyPart(direction: number, containers: AvatarImagePartContainer[], frameCount: number, _arg_4: IActiveActionData, renderServerData: boolean = false): AvatarImageBodyPartContainer
    {
        if(!containers || !containers.length) return null;

        if(!this._canvas)
        {
            this._canvas = this._structure.getCanvas(this._scale, this._geometryType);

            if(!this._canvas) return null;
        }

        const isFlipped = AvatarDirectionAngle.DIRECTION_IS_FLIPPED[direction] || false;
        let assetPartDefinition = _arg_4.definition.assetPartDefinition;
        let isCacheable = true;
        let containerIndex = (containers.length - 1);

        while(containerIndex >= 0)
        {
            const container = containers[containerIndex];

            let color = 16777215;

            if(!((direction == 7) && ((container.partType === 'fc') || (container.partType === 'ey'))))
            {
                if(!((container.partType === 'ri') && !container.partId))
                {
                    const partId = container.partId;
                    const animationFrame = container.getFrameDefinition(frameCount);

                    let partType = container.partType;
                    let frameNumber = 0;

                    if(animationFrame)
                    {
                        frameNumber = animationFrame.number;

                        if((animationFrame.assetPartDefinition) && (animationFrame.assetPartDefinition !== '')) assetPartDefinition = animationFrame.assetPartDefinition;
                    }
                    else frameNumber = container.getFrameIndex(frameCount);

                    let assetDirection = direction;
                    let flipH = false;

                    if(isFlipped)
                    {
                        if(((assetPartDefinition === 'wav') && (((partType === AvatarFigurePartType.LEFT_HAND) || (partType === AvatarFigurePartType.LEFT_SLEEVE)) || (partType === AvatarFigurePartType.LEFT_COAT_SLEEVE))) || ((assetPartDefinition === 'drk') && (((partType === AvatarFigurePartType.RIGHT_HAND) || (partType === AvatarFigurePartType.RIGHT_SLEEVE)) || (partType === AvatarFigurePartType.RIGHT_COAT_SLEEVE))) || ((assetPartDefinition === 'blw') && (partType === AvatarFigurePartType.RIGHT_HAND)) || ((assetPartDefinition === 'sig') && (partType === AvatarFigurePartType.LEFT_HAND)) || ((assetPartDefinition === 'respect') && (partType === AvatarFigurePartType.LEFT_HAND)) || (partType === AvatarFigurePartType.RIGHT_HAND_ITEM) || (partType === AvatarFigurePartType.LEFT_HAND_ITEM) || (partType === AvatarFigurePartType.CHEST_PRINT))
                        {
                            flipH = true;
                        }
                        else
                        {
                            if(direction === 4) assetDirection = 2;
                            else if(direction === 5) assetDirection = 1;
                            else if(direction === 6) assetDirection = 0;

                            if(container.flippedPartType !== partType) partType = container.flippedPartType;
                        }
                    }

                    let assetName = (this._scale + '_' + assetPartDefinition + '_' + partType + '_' + partId + '_' + assetDirection + '_' + frameNumber);
                    let asset = this._assets.getAsset(assetName);

                    if(!asset)
                    {
                        assetName = (this._scale + '_std_' + partType + '_' + partId + '_' + assetDirection + '_0');
                        asset = this._assets.getAsset(assetName);
                    }

                    if(asset)
                    {
                        const texture = asset.texture;

                        if(!texture || !texture.valid || !texture.baseTexture)
                        {
                            isCacheable = false;
                        }
                        else
                        {
                            if(container.isColorable && container.color) color = container.color.rgb;

                            const offset = new Point(-(asset.x), -(asset.y));

                            if(flipH) offset.x = (offset.x + ((this._scale === AvatarScaleType.LARGE) ? 65 : 31));

                            if(renderServerData)
                            {
                                const spriteData = new RoomObjectSpriteData();

                                spriteData.name = this._assets.getAssetName(assetName);
                                spriteData.x = (-(offset.x) - 33);
                                spriteData.y = -(offset.y);
                                spriteData.z = (this._serverRenderData.length * -0.0001);
                                spriteData.width = asset.rectangle.width;
                                spriteData.height = asset.rectangle.height;
                                spriteData.flipH = flipH;

                                if(assetPartDefinition === 'lay') spriteData.x = (spriteData.x + 53);

                                if(isFlipped)
                                {
                                    spriteData.flipH = (!(spriteData.flipH));

                                    if(spriteData.flipH) spriteData.x = (-(spriteData.x) - texture.width);
                                    else spriteData.x = (spriteData.x + 65);
                                }

                                if(container.isColorable) spriteData.color = `${color}`;

                                this._serverRenderData.push(spriteData);
                            }

                            this._unionImages.push(new ImageData(texture, asset.rectangle, offset, flipH, color));
                        }
                    }
                }
            }

            containerIndex--;
        }

        if(!this._unionImages.length) return null;

        const imageData = this.createUnionImage(this._unionImages, isFlipped);
        const canvasOffset = ((this._scale === AvatarScaleType.LARGE) ? (this._canvas.height - 16) : (this._canvas.height - 8));
        const offset = new Point(-(imageData.regPoint.x), (canvasOffset - imageData.regPoint.y));

        if(isFlipped && (assetPartDefinition !== 'lay')) offset.x = (offset.x + ((this._scale === AvatarScaleType.LARGE) ? 67 : 31));

        let imageIndex = (this._unionImages.length - 1);

        while(imageIndex >= 0)
        {
            const _local_17 = this._unionImages.pop();

            if(_local_17) _local_17.dispose();

            imageIndex--;
        }

        return new AvatarImageBodyPartContainer(imageData.container, offset, isCacheable);
    }

    private convertColorToHex(k: number): string
    {
        let _local_2: string = (k * 0xFF).toString(16);
        if(_local_2.length < 2)
        {
            _local_2 = ('0' + _local_2);
        }
        return _local_2;
    }

    private createUnionImage(k: ImageData[], isFlipped: boolean): ImageData
    {
        const bounds = new Rectangle();

        for(const data of k) data && bounds.enlarge(data.offsetRect);

        const point = new Point(-(bounds.x), -(bounds.y));
        const container = new NitroContainer();

        const sprite = new NitroSprite(Texture.EMPTY);

        sprite.width = bounds.width;
        sprite.height = bounds.height;

        container.addChild(sprite);

        for(const data of k)
        {
            if(!data) continue;

            const texture = data.texture;
            const color = data.colorTransform;
            const flipH = (!(isFlipped && data.flipH) && (isFlipped || data.flipH));
            const regPoint = point.clone();

            regPoint.x -= data.regPoint.x;
            regPoint.y -= data.regPoint.y;

            if(isFlipped) regPoint.x = (container.width - (regPoint.x + data.rect.width));

            if(flipH)
            {
                this._matrix.a = -1;
                this._matrix.tx = ((data.rect.x + data.rect.width) + regPoint.x);
                this._matrix.ty = (regPoint.y - data.rect.y);
            }
            else
            {
                this._matrix.a = 1;
                this._matrix.tx = (regPoint.x - data.rect.x);
                this._matrix.ty = (regPoint.y - data.rect.y);
            }

            const sprite = new NitroSprite(texture);

            sprite.tint = color;
            sprite.transform.setFromMatrix(this._matrix);

            container.addChild(sprite);
        }

        return new ImageData(null, container.getLocalBounds(), point, isFlipped, null, container);
    }
}
