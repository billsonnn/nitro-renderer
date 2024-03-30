import { AvatarDirectionAngle, AvatarFigurePartType, AvatarScaleType, GeometryType, IActiveActionData, IAvatarImage } from '@nitrots/api';
import { GetTickerTime } from '@nitrots/utils';
import { Container, Matrix, Point, Rectangle, Sprite, Texture } from 'pixi.js';
import { AvatarImageBodyPartContainer } from '../AvatarImageBodyPartContainer';
import { AvatarImagePartContainer } from '../AvatarImagePartContainer';
import { AvatarStructure } from '../AvatarStructure';
import { AssetAliasCollection } from '../alias';
import { AvatarAnimationLayerData } from '../animation';
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

    public getImageContainer(key: string, frameNumber: number, forceRefresh: boolean = false): AvatarImageBodyPartContainer
    {
        const bodyPartCache = this.getBodyPartCache(key) || new AvatarImageBodyPartCache();

        this._cache.set(key, bodyPartCache);

        let direction = bodyPartCache.getDirection();
        let action = bodyPartCache.getAction();
        let adjustedFrameCount = frameNumber;

        if(action.definition.startFromFrameZero) adjustedFrameCount -= action.startFrame;

        let adjustedAction = action;
        let removeData: string[] = [];
        let items: Map<string, string> = new Map();

        const positionOffset = new Point();

        if(action.definition.isAnimation)
        {
            let adjustedDirection = direction;

            const animation = this._structure.getAnimation(((action.definition.state + '.') + action.actionParameter));
            const animationFrameOffset = (frameNumber - action.startFrame);

            if(animation)
            {
                const layerData = animation.getLayerData(animationFrameOffset, key, action.overridingAction);

                if(layerData)
                {
                    adjustedDirection = (direction + layerData.dd + 8) % 8;

                    positionOffset.x = this._scale === AvatarScaleType.LARGE ? layerData.dx : layerData.dx / 2;
                    positionOffset.y = this._scale === AvatarScaleType.LARGE ? layerData.dy : layerData.dy / 2;

                    adjustedFrameCount = layerData.animationFrame;

                    if(layerData.action) action = layerData.action;

                    if(layerData.type === AvatarAnimationLayerData.BODYPART)
                    {
                        if(layerData.action) adjustedAction = layerData.action;

                        direction = adjustedDirection;
                    }
                    else if(layerData.type === AvatarAnimationLayerData.FX) direction = adjustedDirection;

                    items = layerData.items;
                }

                removeData = animation.removeData;
            }
        }

        let actionCache = bodyPartCache.getActionCache(adjustedAction);

        if(!actionCache || forceRefresh)
        {
            actionCache = new AvatarImageActionCache();
            bodyPartCache.updateActionCache(adjustedAction, actionCache);
        }

        let directionCache = actionCache.getDirectionCache(direction);

        if(!directionCache || forceRefresh)
        {
            const partList = this._structure.getParts(key, this._avatar.getFigure(), adjustedAction, this._geometryType, direction, removeData, this._avatar, items);

            directionCache = new AvatarImageDirectionCache(partList);

            actionCache.updateDirectionCache(direction, directionCache);
        }

        let imageContainer = directionCache.getImageContainer(adjustedFrameCount);

        if(!imageContainer || forceRefresh)
        {
            const partList = directionCache.getPartList();

            imageContainer = this.renderBodyPart(direction, partList, adjustedFrameCount, action);

            if(imageContainer && !forceRefresh)
            {
                if(imageContainer.isCacheable) directionCache.updateImageContainer(imageContainer, adjustedFrameCount);
            }
            else
            {
                return null;
            }
        }

        const offset = this._structure.getFrameBodyPartOffset(adjustedAction, direction, adjustedFrameCount, key);

        positionOffset.x += offset.x;
        positionOffset.y += offset.y;

        imageContainer.offset = positionOffset;

        return imageContainer;
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

    private renderBodyPart(direction: number, containers: AvatarImagePartContainer[], frameCount: number, action: IActiveActionData): AvatarImageBodyPartContainer
    {
        if(!containers || !containers.length) return null;

        if(!this._canvas)
        {
            this._canvas = this._structure.getCanvas(this._scale, this._geometryType);

            if(!this._canvas) return null;
        }

        const isFlipped = AvatarDirectionAngle.DIRECTION_IS_FLIPPED[direction] || false;
        let assetPartDefinition = action.definition.assetPartDefinition;
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

                        if(!texture || !texture.source)
                        {
                            isCacheable = false;
                        }
                        else
                        {
                            if(container.isColorable && container.color) color = container.color.rgb;

                            const offset = new Point(-(asset.x), -(asset.y));

                            if(flipH) offset.x = (offset.x + ((this._scale === AvatarScaleType.LARGE) ? 65 : 31));

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
        const container = new Container();

        const sprite = new Sprite(Texture.EMPTY);

        sprite.width = bounds.width;
        sprite.height = bounds.height;

        container.addChild(sprite);

        for(const data of k)
        {
            if(!data) continue;

            const regPoint = point.clone();

            regPoint.x -= data.regPoint.x;
            regPoint.y -= data.regPoint.y;

            if(isFlipped) regPoint.x = (container.width - (regPoint.x + data.rect.width));

            if(isFlipped != data.flipH)
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

            const sprite = new Sprite(data.texture);

            sprite.tint = data.colorTransform;
            sprite.setFromMatrix(this._matrix);

            container.addChild(sprite);
        }

        return new ImageData(null, container.getLocalBounds().rectangle, point, isFlipped, null, container);
    }
}
