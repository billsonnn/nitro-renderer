import { IObjectVisualizationData } from '../../../../../room/object/visualization/IRoomObjectVisualizationData';
import { IGraphicAsset } from '../../../../../room/object/visualization/utils/IGraphicAsset';
import { IRoomGeometry } from '../../../../../room/utils/IRoomGeometry';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { RoomObjectVisualizationType } from '../../RoomObjectVisualizationType';
import { AnimationData } from '../data/AnimationData';
import { AnimationStateData } from '../data/AnimationStateData';
import { DirectionData } from '../data/DirectionData';
import { LayerData } from '../data/LayerData';
import { FurnitureAnimatedVisualization } from '../furniture/FurnitureAnimatedVisualization';
import { FurnitureVisualizationData } from '../furniture/FurnitureVisualizationData';
import { PetVisualizationData } from './PetVisualizationData';

export class PetVisualization extends FurnitureAnimatedVisualization
{
    public static TYPE: string = RoomObjectVisualizationType.PET_ANIMATED;

    private static HEAD: string                         = 'head';
    private static SADDLE: string                       = 'saddle';
    private static HAIR: string                         = 'hair';
    private static ADDITIONAL_SPRITE_COUNT: number      = 1;
    private static EXPERIENCE_BUBBLE_VISIBLE_IN_MS: number = 1000;
    private static PET_EXPERIENCE_BUBBLE_PNG: string    = 'pet_experience_bubble_png';
    private static POSTURE_ANIMATION_INDEX: number      = 0;
    private static GESTURE_ANIMATION_INDEX: number      = 1;
    private static ANIMATION_INDEX_COUNT: number        = 2;

    protected _data: PetVisualizationData;

    private _posture: string;
    private _gesture: string;
    private _isSleeping: boolean;
    private _headDirection: number;
    private _headOnly: boolean;
    private _nonHeadSprites: boolean[];
    private _headSprites: boolean[];
    private _saddleSprites: boolean[];
    private _animationOver: boolean;
    private _paletteIndex: number;
    private _paletteName: string;
    private _customLayerIds: number[];
    private _customPartIds: number[];
    private _customPaletteIds: number[];
    private _isRiding: boolean;
    private _color: number;

    private _previousAnimationDirection: number;
    private _animationStates: AnimationStateData[];

    constructor()
    {
        super();

        this._data                          = null;

        this._posture                       = '';
        this._gesture                       = '';
        this._isSleeping                    = false;
        this._headDirection                 = -1;
        this._headOnly                      = false;
        this._nonHeadSprites                = [];
        this._headSprites                   = [];
        this._saddleSprites                 = [];
        this._animationOver                 = false;
        this._paletteIndex                  = -1;
        this._paletteName                   = '';
        this._customLayerIds                = [];
        this._customPartIds                 = [];
        this._customPaletteIds              = [];
        this._isRiding                      = false;
        this._color                         = 0xFFFFFF;

        this._previousAnimationDirection    = -1;
        this._animationStates               = [];

        while(this._animationStates.length < PetVisualization.ANIMATION_INDEX_COUNT) this._animationStates.push(new AnimationStateData());
    }

    public initialize(data: IObjectVisualizationData): boolean
    {
        if(!(data instanceof PetVisualizationData)) return false;

        return super.initialize(data);
    }

    public dispose(): void
    {
        super.dispose();

        if(this._animationStates)
        {
            while(this._animationStates.length)
            {
                const animationState = this._animationStates[0];

                if(animationState) animationState.dispose();

                this._animationStates.pop();
            }

            this._animationStates = null;
        }
    }

    protected getAnimationId(animationData: AnimationStateData): number
    {
        return animationData.animationId;
    }

    public update(geometry: IRoomGeometry, time: number, update: boolean, skipUpdate: boolean): void
    {
        super.update(geometry, time, update, skipUpdate);

        // update experience
    }

    protected updateModel(scale: number): boolean
    {
        const model = this.object && this.object.model;

        if(!model) return false;

        if(this.updateModelCounter === model.updateCounter) return false;

        // _local_4 = _local_3.getString(RoomObjectVariableEnum.FIGURE_POSTURE);
        // _local_5 = _local_3.getString(RoomObjectVariableEnum.FIGURE_GESTURE);
        // _local_6 = _local_3.getNumber(RoomObjectVariableEnum.FIGURE_POSTURE);
        // if (!isNaN(_local_6))
        // {
        //     _local_16 = this._animationData._Str_17398(_Str_3289);
        //     if (_local_16 > 0)
        //     {
        //         _local_4 = this._animationData.animationToPosture(_Str_3289, (_local_6 % _local_16), true);
        //         _local_5 = null;
        //     }
        // }
        // _local_7 = _local_3.getNumber(RoomObjectVariableEnum.FIGURE_GESTURE);
        // if (!isNaN(_local_7))
        // {
        //     _local_17 = this._animationData._Str_16869(_Str_3289);
        //     if (_local_17 > 0)
        //     {
        //         _local_5 = this._animationData.animationToGesture(_Str_3289, (_local_7 % _local_17));
        //     }
        // }
        // this._Str_14314(_local_4, _local_5);



        const posture     = model.getValue<string>(RoomObjectVariable.FIGURE_POSTURE);
        const gesture     = model.getValue<string>(RoomObjectVariable.FIGURE_GESTURE);
        const tempPosture = model.getValue<string>(RoomObjectVariable.FIGURE_POSTURE);

        this.setPostureAndGesture(posture, gesture);

        let alphaMultiplier = (model.getValue<number>(RoomObjectVariable.FURNITURE_ALPHA_MULTIPLIER) || null);

        if(alphaMultiplier === null || isNaN(alphaMultiplier)) alphaMultiplier = 1;

        if(this._alphaMultiplier !== alphaMultiplier)
        {
            this._alphaMultiplier = alphaMultiplier;

            this._alphaChanged = true;
        }

        this._isSleeping = (model.getValue<number>(RoomObjectVariable.FIGURE_SLEEP) > 0);

        const headDirection = model.getValue<number>(RoomObjectVariable.HEAD_DIRECTION);

        if(!isNaN(headDirection) && this._data.isAllowedToTurnHead)
        {
            this._headDirection = headDirection;
        }
        else
        {
            this._headDirection = this.object.getDirection().x;
        }

        const customPaletteIndex    = model.getValue<number>(RoomObjectVariable.PET_PALETTE_INDEX);
        const customLayerIds        = model.getValue<number[]>(RoomObjectVariable.PET_CUSTOM_LAYER_IDS);
        const customPartIds         = model.getValue<number[]>(RoomObjectVariable.PET_CUSTOM_PARTS_IDS);
        const customPaletteIds      = model.getValue<number[]>(RoomObjectVariable.PET_CUSTOM_PALETTE_IDS);
        const isRiding              = model.getValue<number>(RoomObjectVariable.PET_IS_RIDING);
        const headOnly              = model.getValue<number>(RoomObjectVariable.PET_HEAD_ONLY);
        const color                 = model.getValue<number>(RoomObjectVariable.PET_COLOR);

        if(customPaletteIndex !== this._paletteIndex)
        {
            this._paletteIndex  = customPaletteIndex;
            this._paletteName   = this._paletteIndex.toString();
        }

        this._customLayerIds    = (customLayerIds) ? customLayerIds : [];
        this._customPartIds     = (customPartIds) ? customPartIds : [];
        this._customPaletteIds  = (customPaletteIds) ? customPaletteIds : [];
        this._isRiding          = (!isNaN(isRiding) && (isRiding > 0));
        this._headOnly          = (!isNaN(headOnly) && (headOnly > 0));

        if(!isNaN(color) && this._color !== color) this._color = color;

        this.updateModelCounter = model.updateCounter;

        return true;
    }

    protected updateAnimation(scale: number): number
    {
        if(this.object)
        {
            const direction = this.object.getDirection().x;

            if(direction !== this._previousAnimationDirection)
            {
                this._previousAnimationDirection = direction;

                this.resetAllAnimationFrames();
            }
        }

        return super.updateAnimation(scale);
    }

    protected setPostureAndGesture(posture: string, gesture: string): void
    {
        if(posture !== this._posture)
        {
            this._posture = posture;

            this.setAnimationForIndex(PetVisualization.POSTURE_ANIMATION_INDEX, this._data.postureToAnimation(this._scale, posture));
        }

        if(this._data.getGestureDisabled(this._scale, posture)) gesture = null;

        if(gesture !== this._gesture)
        {
            this._gesture = gesture;

            this.setAnimationForIndex(PetVisualization.GESTURE_ANIMATION_INDEX, this._data.gestureToAnimation(this._scale, gesture));
        }
    }

    private getAnimationStateData(k: number): AnimationStateData
    {
        if((k >= 0) && (k < this._animationStates.length)) return this._animationStates[k];

        return null;
    }

    private setAnimationForIndex(k: number, _arg_2: number): void
    {
        const animationStateData = this.getAnimationStateData(k);

        if(animationStateData)
        {
            if(this.setSubAnimation(animationStateData, _arg_2)) this._animationOver = false;
        }
    }

    protected resetAllAnimationFrames(): void
    {
        this._animationOver = false;

        let index = (this._animationStates.length - 1);

        while(index >= 0)
        {
            const stateData = this._animationStates[index];

            if(stateData) stateData.setLayerCount(this.animatedLayerCount);

            index--;
        }
    }

    protected updateAnimations(scale: number): number
    {
        if(this._animationOver) return 0;

        let animationOver   = true;
        let _local_3        = 0;
        let index           = 0;

        while(index < this._animationStates.length)
        {
            const stateData = this._animationStates[index];

            if(stateData)
            {
                if(!stateData.animationOver)
                {
                    const _local_6 = this.updateFramesForAnimation(stateData, scale);

                    _local_3 = (_local_3 | _local_6);

                    if(!stateData.animationOver)
                    {
                        animationOver = false;
                    }
                    else
                    {
                        if(AnimationData.isTransitionFromAnimation(stateData.animationId) || AnimationData.isTransitionToAnimation(stateData.animationId))
                        {
                            this.setAnimationForIndex(index, stateData.animationAfterTransitionId);

                            animationOver = false;
                        }
                    }
                }
            }

            index++;
        }

        this._animationOver = animationOver;

        return _local_3;
    }

    protected getSpriteAssetName(scale: number, layerId: number): string
    {
        if(this._headOnly && this.isNonHeadSprite(layerId)) return null;

        if(this._isRiding && this._parser3(layerId)) return null;

        const totalSprites = this.totalSprites;

        if(layerId < (totalSprites - PetVisualization.ADDITIONAL_SPRITE_COUNT))
        {
            const validScale = this.getValidSize(scale);

            if(layerId < (totalSprites - (1 + PetVisualization.ADDITIONAL_SPRITE_COUNT)))
            {
                if(layerId >= FurnitureVisualizationData.LAYER_LETTERS.length) return null;

                const layerLetter = FurnitureVisualizationData.LAYER_LETTERS[layerId];

                if(validScale === 1) return (this._type + '_icon_' + layerLetter);

                return (this._type + '_' + validScale + '_' + layerLetter + '_' + this.getDirection(scale, layerId) + '_' + this.getFrameNumber(validScale, layerId));
            }

            return (this._type + '_' + validScale + '_sd_' + this.getDirection(scale, layerId) + '_0');
        }

        return null;
    }

    protected getLayerColor(scale: number, layerId: number, colorId: number): number
    {
        if(layerId < (this.totalSprites - PetVisualization.ADDITIONAL_SPRITE_COUNT)) return this._color;

        return 0xFFFFFF;
    }

    protected getLayerXOffset(scale: number, direction: number, layerId: number): number
    {
        let offset  = super.getLayerXOffset(scale, direction, layerId);
        let index   = (this._animationStates.length - 1);

        while(index >= 0)
        {
            const stateData = this._animationStates[index];

            if(stateData)
            {
                const frame = stateData.getFrame(layerId);

                if(frame) offset += frame.x;
            }

            index--;
        }

        return offset;
    }

    protected getLayerYOffset(scale: number, direction: number, layerId: number): number
    {
        let offset  = super.getLayerYOffset(scale, direction, layerId);
        let index   = (this._animationStates.length - 1);

        while(index >= 0)
        {
            const stateData = this._animationStates[index];

            if(stateData)
            {
                const frame = stateData.getFrame(layerId);

                if(frame) offset += frame.y;
            }

            index--;
        }

        return offset;
    }

    protected getLayerZOffset(scale: number, direction: number, layerId: number): number
    {
        if(!this._data) return LayerData.DEFAULT_ZOFFSET;

        return this._data.getLayerZOffset(scale, this.getDirection(scale, layerId), layerId);
    }

    private getDirection(scale: number, layerId: number): number
    {
        if(!this.isHeadSprite(layerId)) return this._direction;

        return this._data.getValidDirection(scale, this._headDirection);
    }

    protected getFrameNumber(scale: number, layerId: number): number
    {
        let index = (this._animationStates.length - 1);

        while(index >= 0)
        {
            const stateData = this._animationStates[index];

            if(stateData)
            {
                const frame = stateData.getFrame(layerId);

                if(frame) return frame.id;
            }

            index--;
        }

        return super.getFrameNumber(scale, layerId);
    }

    private isHeadSprite(layerId: number): boolean
    {
        if(this._headSprites[layerId] === undefined)
        {
            const isHead = (this._data.getLayerTag(this._scale, DirectionData.USE_DEFAULT_DIRECTION, layerId) === PetVisualization.HEAD);
            const isHair = (this._data.getLayerTag(this._scale, DirectionData.USE_DEFAULT_DIRECTION, layerId) === PetVisualization.HAIR);

            if(isHead || isHair) this._headSprites[layerId] = true;
            else this._headSprites[layerId] = false;
        }

        return this._headSprites[layerId];
    }

    private isNonHeadSprite(layerId: number): boolean
    {
        if(this._nonHeadSprites[layerId] === undefined)
        {
            if(layerId < (this.totalSprites - (1 + PetVisualization.ADDITIONAL_SPRITE_COUNT)))
            {
                const tag = this._data.getLayerTag(this._scale, DirectionData.USE_DEFAULT_DIRECTION, layerId);

                if(((tag && (tag.length > 0)) && (tag !== PetVisualization.HEAD)) && (tag !== PetVisualization.HAIR))
                {
                    this._nonHeadSprites[layerId] = true;
                }
                else
                {
                    this._nonHeadSprites[layerId] = false;
                }
            }
            else
            {
                this._nonHeadSprites[layerId] = true;
            }
        }

        return this._nonHeadSprites[layerId];
    }

    private _parser3(layerId: number): boolean
    {
        if(this._saddleSprites[layerId] === undefined)
        {
            if(this._data.getLayerTag(this._scale, DirectionData.USE_DEFAULT_DIRECTION, layerId) === PetVisualization.SADDLE)
            {
                this._saddleSprites[layerId] = true;
            }
            else
            {
                this._saddleSprites[layerId] = false;
            }
        }

        return this._saddleSprites[layerId];
    }

    public getAsset(name: string, layerId: number = -1): IGraphicAsset
    {
        if(!this.asset) return null;

        const layerIndex  = this._customLayerIds.indexOf(layerId);
        let paletteName = this._paletteName;
        let partId      = -1;
        let paletteId   = -1;

        if(layerIndex > -1)
        {
            partId      = this._customPartIds[layerIndex];
            paletteId   = this._customPaletteIds[layerIndex];
            paletteName = ((paletteId > -1) ? paletteId.toString() : this._paletteName);
        }

        if(!(isNaN(partId)) && (partId > -1))
        {
            name = (name + '_' + partId);
        }

        return this.asset.getAssetWithPalette(name, paletteName);
    }

    protected getAdditionalLayerCount(): number
    {
        return super.getAdditionalLayerCount() + PetVisualization.ADDITIONAL_SPRITE_COUNT;
    }

    protected setLayerCount(count: number): void
    {
        super.setLayerCount(count);

        this._headSprites = [];
    }

    protected getPostureForAsset(scale: number, name: string): string
    {
        const parts   = name.split('_');
        let length  = parts.length;
        let i       = 0;

        while(i < parts.length)
        {
            if((parts[i] === '64') || (parts[i] === '32'))
            {
                length = (i + 3);

                break;
            }

            i++;
        }

        let posture: string = null;

        if(length < parts.length)
        {
            let part = parts[length];

            part = part.split('@')[0];

            posture = this._data.animationToPosture(scale, (parseInt(part) / 100), false);

            if(!posture) posture = this._data.getGestureForAnimationId(scale, (parseInt(part) / 100));
        }

        return posture;
    }
}
