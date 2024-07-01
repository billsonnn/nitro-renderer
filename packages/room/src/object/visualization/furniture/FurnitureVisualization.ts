import { AlphaTolerance, IGraphicAsset, IObjectVisualizationData, IRoomGeometry, IRoomObjectSprite, RoomObjectVariable, RoomObjectVisualizationType } from '@nitrots/api';
import { BLEND_MODES, Filter, Texture } from 'pixi.js';
import { RoomObjectSpriteVisualization } from '../RoomObjectSpriteVisualization';
import { ColorData, LayerData } from '../data';
import { FurnitureVisualizationData } from './FurnitureVisualizationData';

export class FurnitureVisualization extends RoomObjectSpriteVisualization
{
    protected static DEPTH_MULTIPLIER: number = Math.sqrt(0.5);

    public static TYPE: string = RoomObjectVisualizationType.FURNITURE_STATIC;

    protected _data: FurnitureVisualizationData;

    protected _type: string;
    protected _direction: number;
    protected _lastCameraAngle: number;
    protected _selectedColor: number;
    protected _furnitureLift: number;
    protected _alphaMultiplier: number;
    protected _alphaChanged: boolean;
    protected _clickUrl: string;
    protected _clickHandling: boolean;

    protected _cacheDirection: number;
    protected _cacheScale: number;
    protected _cacheSize: number;

    protected _layerCount: number;
    protected _shadowLayerIndex: number;
    protected _updatedLayers: boolean[];
    protected _assetNames: string[];
    protected _spriteTags: string[];
    protected _spriteBlendModes: BLEND_MODES[];
    protected _spriteAlphas: number[];
    protected _spriteColors: number[];
    protected _spriteMouseCaptures: boolean[];
    protected _spriteXOffsets: number[];
    protected _spriteYOffsets: number[];
    protected _spriteZOffsets: number[];
    protected _filters: Filter[] = [];

    private _animationNumber: number;
    private _lookThrough: boolean;
    private _needsLookThroughUpdate: boolean;

    constructor()
    {
        super();

        this._data = null;

        this._type = null;
        this._direction = 0;
        this._lastCameraAngle = NaN;
        this._selectedColor = 0;
        this._furnitureLift = 0;
        this._alphaMultiplier = 1;
        this._alphaChanged = false;
        this._clickUrl = null;
        this._clickHandling = false;

        this._cacheDirection = -1;
        this._cacheScale = 0;
        this._cacheSize = -1;

        this._layerCount = 0;
        this._shadowLayerIndex = -1;
        this._updatedLayers = [];
        this._assetNames = [];
        this._spriteTags = [];
        this._spriteBlendModes = [];
        this._spriteAlphas = [];
        this._spriteColors = [];
        this._spriteMouseCaptures = [];
        this._spriteXOffsets = [];
        this._spriteYOffsets = [];
        this._spriteZOffsets = [];

        this._animationNumber = 0;
        this._lookThrough = false;
    }

    public initialize(data: IObjectVisualizationData): boolean
    {
        this.reset();

        if(!(data instanceof FurnitureVisualizationData)) return false;

        this._type = data.type;
        this._data = data;

        return true;
    }

    public dispose(): void
    {
        super.dispose();

        this._data = null;
        this._updatedLayers = null;
        this._assetNames = null;
        this._spriteTags = null;
        this._spriteBlendModes = null;
        this._spriteAlphas = null;
        this._spriteColors = null;
        this._spriteMouseCaptures = null;
        this._spriteXOffsets = null;
        this._spriteYOffsets = null;
        this._spriteZOffsets = null;
        this._filters = [];
    }

    protected reset(): void
    {
        super.reset();

        this.setDirection(-1);

        this._data = null;
        this._updatedLayers = [];
        this._assetNames = [];
        this._spriteTags = [];
        this._spriteBlendModes = [];
        this._spriteAlphas = [];
        this._spriteColors = [];
        this._spriteMouseCaptures = [];
        this._spriteXOffsets = [];
        this._spriteYOffsets = [];
        this._spriteZOffsets = [];

        this.createSprites(0);
    }

    protected resetLayers(scale: number, direction: number): void
    {
        if((this._cacheDirection === direction) && (this._cacheScale === scale)) return;

        this._updatedLayers = [];
        this._assetNames = [];
        this._spriteTags = [];
        this._spriteBlendModes = [];
        this._spriteAlphas = [];
        this._spriteColors = [];
        this._spriteMouseCaptures = [];
        this._spriteXOffsets = [];
        this._spriteYOffsets = [];
        this._spriteZOffsets = [];

        this._cacheDirection = direction;
        this._cacheScale = scale;
        this._cacheSize = this.getValidSize(scale);

        this.setLayerCount(((this._data && this._data.getLayerCount(scale)) || 0) + this.getAdditionalLayerCount());
    }

    public update(geometry: IRoomGeometry, time: number, update: boolean, skipUpdate: boolean): void
    {
        if(!geometry) return;

        const scale = geometry.scale;
        let updateSprites = false;

        if(this.updateObject(scale, geometry.direction.x)) updateSprites = true;

        if(this.updateModel(scale)) updateSprites = true;

        if(this._needsLookThroughUpdate)
        {
            updateSprites = true;
            this._needsLookThroughUpdate = false;
        }

        let number = 0;

        if(skipUpdate)
        {
            this._animationNumber = (this._animationNumber | this.updateAnimation(scale));
        }
        else
        {
            number = this.updateAnimation(scale) | this._animationNumber;

            this._animationNumber = 0;
        }

        if(updateSprites || (number !== 0))
        {
            this.updateSprites(scale, updateSprites, number);

            this._scale = scale;

            this.updateSpriteCounter++;
        }
    }

    protected updateObject(scale: number, direction: number): boolean
    {
        if(!this.object) return false;

        if((this.updateObjectCounter === this.object.updateCounter) && (scale === this._scale) && (this._lastCameraAngle === direction)) return false;

        let offsetDirection = (this.object.getDirection().x - (direction + 135));

        offsetDirection = ((((offsetDirection) % 360) + 360) % 360);

        if(this._data)
        {
            const validDirection = this._data.getValidDirection(scale, offsetDirection);

            this.setDirection(validDirection);
        }

        this._lastCameraAngle = direction;
        this._scale = scale;

        this.updateObjectCounter = this.object.updateCounter;

        this.resetLayers(scale, this._direction);

        return true;
    }

    protected updateModel(scale: number): boolean
    {
        const model = this.object && this.object.model;

        if(!model) return false;

        if(this.updateModelCounter === model.updateCounter) return false;

        this._selectedColor = model.getValue<number>(RoomObjectVariable.FURNITURE_COLOR);
        this._clickUrl = model.getValue<string>(RoomObjectVariable.FURNITURE_AD_URL);
        this._clickHandling = ((this._clickUrl && (this._clickUrl !== '') && (this._clickUrl.indexOf('http') === 0)) || false);
        this._furnitureLift = (model.getValue<number>(RoomObjectVariable.FURNITURE_LIFT_AMOUNT) || 0);

        let alphaMultiplier = model.getValue<number>(RoomObjectVariable.FURNITURE_ALPHA_MULTIPLIER);

        if(isNaN(alphaMultiplier)) alphaMultiplier = 1;

        if(this._alphaMultiplier !== alphaMultiplier)
        {
            this._alphaMultiplier = alphaMultiplier;

            this._alphaChanged = true;
        }

        this.updateModelCounter = model.updateCounter;

        return true;
    }

    protected updateSprites(scale: number, update: boolean, animation: number): void
    {
        if(this._layerCount !== this.totalSprites) this.createSprites(this._layerCount);

        if(update)
        {
            let layerId = (this.totalSprites - 1);

            while(layerId >= 0)
            {
                this.updateSprite(scale, layerId);

                layerId--;
            }
        }
        else
        {
            let layerId = 0;

            while(animation > 0)
            {
                if(animation) this.updateSprite(scale, layerId);

                layerId++;
                animation = (animation >> 1);
            }
        }

        this._alphaChanged = false;
    }

    protected updateSprite(scale: number, layerId: number): void
    {
        const assetName = this.getSpriteAssetName(scale, layerId);
        const sprite = this.getSprite(layerId);

        if(assetName && sprite)
        {
            const assetData = this.getAsset(assetName, layerId);

            if(assetData)
            {
                sprite.visible = true;
                sprite.type = this._type;
                sprite.texture = this.getTexture(scale, layerId, assetData);
                sprite.flipH = assetData.flipH;
                sprite.flipV = assetData.flipV;
                sprite.direction = this._direction;

                let relativeDepth = 0;

                if(layerId !== this._shadowLayerIndex)
                {
                    sprite.tag = this.getLayerTag(scale, this._direction, layerId);
                    sprite.alpha = this.getLayerAlpha(scale, this._direction, layerId);
                    sprite.color = this.getLayerColor(scale, layerId, this._selectedColor);
                    sprite.offsetX = (assetData.offsetX + this.getLayerXOffset(scale, this._direction, layerId));
                    sprite.offsetY = (assetData.offsetY + this.getLayerYOffset(scale, this._direction, layerId));
                    sprite.blendMode = this.getLayerBlendMode(scale, this._direction, layerId);
                    sprite.alphaTolerance = (this.getLayerIgnoreMouse(scale, this._direction, layerId) ? AlphaTolerance.MATCH_NOTHING : AlphaTolerance.MATCH_OPAQUE_PIXELS);

                    relativeDepth = this.getLayerZOffset(scale, this._direction, layerId);
                    relativeDepth = (relativeDepth - (layerId * 0.001));
                }
                else
                {
                    sprite.offsetX = assetData.offsetX;
                    sprite.offsetY = (assetData.offsetY + this.getLayerYOffset(scale, this._direction, layerId));
                    sprite.alpha = (48 * this._alphaMultiplier);
                    sprite.alphaTolerance = AlphaTolerance.MATCH_NOTHING;

                    relativeDepth = 1;
                }

                if(this._lookThrough) sprite.alpha *= 0.2;

                sprite.relativeDepth = (relativeDepth * FurnitureVisualization.DEPTH_MULTIPLIER);
                sprite.name = assetName;
                sprite.libraryAssetName = this.getLibraryAssetNameForSprite(assetData, sprite);
                sprite.posture = this.getPostureForAsset(scale, assetData.source);
                sprite.clickHandling = this._clickHandling;

                if(sprite.blendMode !== 'add') sprite.filters = this._filters;
            }
            else
            {
                this.resetSprite(sprite);
            }
        }
        else
        {
            if(sprite) this.resetSprite(sprite);
        }
    }

    protected getLibraryAssetNameForSprite(asset: IGraphicAsset, sprite: IRoomObjectSprite): string
    {
        return asset.source;
    }

    protected getPostureForAssetFile(scale: number, _arg_2: string): string
    {
        return null;
    }

    private resetSprite(sprite: IRoomObjectSprite): void
    {
        if(!sprite) return;

        sprite.texture = null;
        sprite.libraryAssetName = '';
        sprite.posture = '';
        sprite.tag = '';
        sprite.offsetX = 0;
        sprite.offsetY = 0;
        sprite.flipH = false;
        sprite.flipV = false;
        sprite.relativeDepth = 0;
        sprite.clickHandling = false;
    }

    protected getSpriteAssetName(scale: number, layerId: number): string
    {
        if(!this._data || (layerId >= FurnitureVisualizationData.LAYER_LETTERS.length)) return '';

        let assetName = this._assetNames[layerId];
        let updated = this._updatedLayers[layerId];

        if(!assetName || !assetName.length)
        {
            assetName = this.cacheSpriteAssetName(scale, layerId, true);
            updated = (this._cacheSize !== 1);
        }

        if(updated) assetName += this.getFrameNumber(scale, layerId);

        return assetName;
    }

    protected cacheSpriteAssetName(scale: number, layerId: number, cache: boolean): string
    {
        const type = this._type;
        const size = (cache) ? this._cacheSize : this.getValidSize(scale);
        let layerCode = '';
        const isntIcon = (size !== 1);

        if(layerId !== this._shadowLayerIndex)
        {
            layerCode = FurnitureVisualizationData.LAYER_LETTERS[layerId] || '';
        }
        else
        {
            layerCode = 'sd';
        }

        if(layerCode === '') return null;

        const assetName = (this._type + ((isntIcon) ? ('_' + size + '_' + layerCode + '_' + this._direction + '_') : ('_icon_' + layerCode)));

        if(cache)
        {
            this._assetNames[layerId] = assetName;
            this._updatedLayers[layerId] = isntIcon;
        }

        return assetName;
    }

    protected getLayerTag(scale: number, direction: number, layerId: number): string
    {
        const existing = this._spriteTags[layerId];

        if(existing !== undefined) return existing;

        if(!this._data) return LayerData.DEFAULT_TAG;

        const tag = this._data.getLayerTag(scale, direction, layerId);

        this._spriteTags[layerId] = tag;

        return tag;
    }

    protected getLayerBlendMode(scale: number, direction: number, layerId: number): BLEND_MODES
    {
        const existing = this._spriteBlendModes[layerId];

        if(existing !== undefined) return existing;

        if(!this._data) return LayerData.DEFAULT_BLEND_MODE;

        const blendMode = this._data.getLayerBlendMode(scale, direction, layerId);

        this._spriteBlendModes[layerId] = blendMode;

        return blendMode;
    }

    protected getLayerAlpha(scale: number, direction: number, layerId: number): number
    {
        if(!this._alphaChanged)
        {
            const existing = this._spriteAlphas[layerId];

            if(existing !== undefined) return existing;
        }

        if(!this._data) return LayerData.DEFAULT_ALPHA;

        let alpha = this._data.getLayerAlpha(scale, direction, layerId);

        if(this._alphaMultiplier !== null) alpha = (alpha * this._alphaMultiplier);

        this._spriteAlphas[layerId] = alpha;

        return alpha;
    }

    protected getLayerColor(scale: number, layerId: number, colorId: number): number
    {
        const existing = this._spriteColors[layerId];

        if(existing !== undefined) return existing;

        if(!this._data) return ColorData.DEFAULT_COLOR;

        const color = this._data.getLayerColor(scale, layerId, colorId);

        this._spriteColors[layerId] = color;

        return color;
    }

    protected getLayerIgnoreMouse(scale: number, direction: number, layerId: number): boolean
    {
        const existing = this._spriteMouseCaptures[layerId];

        if(existing !== undefined) return existing;

        if(!this._data) return LayerData.DEFAULT_IGNORE_MOUSE;

        const ignoreMouse = this._data.getLayerIgnoreMouse(scale, direction, layerId);

        this._spriteMouseCaptures[layerId] = ignoreMouse;

        return ignoreMouse;
    }

    protected getLayerXOffset(scale: number, direction: number, layerId: number): number
    {
        const existing = this._spriteXOffsets[layerId];

        if(existing !== undefined) return existing;

        if(!this._data) return LayerData.DEFAULT_XOFFSET;

        const xOffset = this._data.getLayerXOffset(scale, direction, layerId);

        this._spriteXOffsets[layerId] = xOffset;

        return xOffset;
    }

    protected getLayerYOffset(scale: number, direction: number, layerId: number): number
    {
        if(layerId === this._shadowLayerIndex) return Math.ceil((this._furnitureLift * (scale / 2)));

        const existing = this._spriteYOffsets[layerId];

        if(existing !== undefined) return existing;

        if(!this._data) return LayerData.DEFAULT_YOFFSET;

        const yOffset = this._data.getLayerYOffset(scale, direction, layerId);

        this._spriteYOffsets[layerId] = yOffset;

        return yOffset;
    }

    protected getLayerZOffset(scale: number, direction: number, layerId: number): number
    {
        const existing = this._spriteZOffsets[layerId];

        if(existing !== undefined) return existing;

        if(!this._data) return LayerData.DEFAULT_ZOFFSET;

        const zOffset = this._data.getLayerZOffset(scale, direction, layerId);

        this._spriteZOffsets[layerId] = zOffset;

        return zOffset;
    }

    protected getValidSize(scale: number): number
    {
        if(!this._data) return scale;

        return this._data.getValidSize(scale);
    }

    protected setLayerCount(count: number): void
    {
        this._layerCount = count;
        this._shadowLayerIndex = count - this.getAdditionalLayerCount();
    }

    protected setDirection(direction: number): void
    {
        if(this._direction === direction) return;

        this._direction = direction;
    }

    protected getAdditionalLayerCount(): number
    {
        return 1;
    }

    protected updateAnimation(scale: number): number
    {
        return 0;
    }

    protected getFrameNumber(scale: number, layerId: number): number
    {
        return 0;
    }

    protected getPostureForAsset(scale: number, name: string): string
    {
        return null;
    }

    public getAsset(name: string, layerId: number = -1): IGraphicAsset
    {
        if(!this.asset) return null;

        return this.asset.getAsset(name);
    }

    public getTexture(scale: number, layerId: number, asset: IGraphicAsset): Texture
    {
        return asset?.texture ?? null;
    }

    public set lookThrough(flag: boolean)
    {
        if(this._lookThrough == flag) return;

        this._lookThrough = flag;
        this._needsLookThroughUpdate = true;
    }

    protected get direction(): number
    {
        return this._direction;
    }

    protected get data(): FurnitureVisualizationData
    {
        return this._data;
    }
}
