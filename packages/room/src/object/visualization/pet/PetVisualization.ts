import { IGraphicAsset, IObjectVisualizationData, IRoomGeometry, RoomObjectVariable, RoomObjectVisualizationType } from '@nitrots/api';
import { GetAssetManager } from '@nitrots/assets';
import { AnimationData, AnimationStateData, DirectionData, LayerData } from '../data';
import { FurnitureAnimatedVisualization, FurnitureVisualizationData } from '../furniture';
import { ExperienceData } from './ExperienceData';
import { PetVisualizationData } from './PetVisualizationData';

export class PetVisualization extends FurnitureAnimatedVisualization
{
    public static TYPE: string = RoomObjectVisualizationType.PET_ANIMATED;

    private static HEAD: string = 'head';
    private static SADDLE: string = 'saddle';
    private static HAIR: string = 'hair';
    private static ADDITIONAL_SPRITE_COUNT: number = 1;
    private static EXPERIENCE_BUBBLE_VISIBLE_IN_MS: number = 1000;
    private static PET_EXPERIENCE_BUBBLE: string = 'avatar_addition_pet_experience_bubble';
    private static POSTURE_ANIMATION_INDEX: number = 0;
    private static GESTURE_ANIMATION_INDEX: number = 1;
    private static ANIMATION_INDEX_COUNT: number = 2;

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
    private _experience: number;
    private _experienceTimestamp: number;
    private _experienceData: ExperienceData;

    private _previousAnimationDirection: number;
    private _animationStates: AnimationStateData[];

    constructor()
    {
        super();

        this._posture = '';
        this._gesture = '';
        this._isSleeping = false;
        this._headDirection = -1;
        this._headOnly = false;
        this._nonHeadSprites = [];
        this._headSprites = [];
        this._saddleSprites = [];
        this._animationOver = false;
        this._paletteIndex = -1;
        this._paletteName = '';
        this._customLayerIds = [];
        this._customPartIds = [];
        this._customPaletteIds = [];
        this._isRiding = false;
        this._color = 0xFFFFFF;
        this._experience = 0;
        this._experienceTimestamp = 0;
        this._experienceData = null;

        this._previousAnimationDirection = -1;
        this._animationStates = [];

        while(this._animationStates.length < PetVisualization.ANIMATION_INDEX_COUNT) this._animationStates.push(new AnimationStateData());
    }

    public initialize(data: IObjectVisualizationData): boolean
    {
        if(!(data instanceof PetVisualizationData)) return false;

        const texture = GetAssetManager().getTexture(PetVisualization.PET_EXPERIENCE_BUBBLE);

        if(texture)
        {
            this._experienceData = new ExperienceData(texture);
        }

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

        this.updateExperienceBubble(time);
    }

    protected updateExperienceBubble(time: number): void
    {
        if(!this._experienceData) return;

        this._experienceData.alpha = 0;

        if(this._experienceTimestamp)
        {
            const difference = (time - this._experienceTimestamp);

            if(difference < PetVisualization.EXPERIENCE_BUBBLE_VISIBLE_IN_MS)
            {
                this._experienceData.alpha = (Math.sin(((difference / PetVisualization.EXPERIENCE_BUBBLE_VISIBLE_IN_MS) * Math.PI)) * 0xFF);
            }
            else
            {
                this._experienceTimestamp = 0;
            }

            const sprite = this.getSprite((this.totalSprites - 1));

            if(sprite)
            {
                if(this._experienceData.alpha > 0)
                {
                    const texture = this._experienceData.renderBubble(this._experience);

                    if(texture)
                    {
                        sprite.texture = texture;
                        sprite.offsetX = -20;
                        sprite.offsetY = -80;
                        sprite.alpha = this._experienceData.alpha;
                        sprite.visible = true;
                        sprite.relativeDepth = -0.2;

                        return;
                    }
                }

                sprite.texture = null;
                sprite.visible = false;
            }
        }
    }

    protected updateModel(scale: number): boolean
    {
        const model = this.object && this.object.model;

        if(!model) return false;

        if(this.updateModelCounter === model.updateCounter) return false;

        const posture = model.getValue<string>(RoomObjectVariable.FIGURE_POSTURE);
        const gesture = model.getValue<string>(RoomObjectVariable.FIGURE_GESTURE);

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

        if(!isNaN(headDirection) && this.data.isAllowedToTurnHead)
        {
            this._headDirection = headDirection;
        }
        else
        {
            this._headDirection = this.object.getDirection().x;
        }

        this._experience = (model.getValue<number>(RoomObjectVariable.FIGURE_GAINED_EXPERIENCE));
        this._experienceTimestamp = (model.getValue<number>(RoomObjectVariable.FIGURE_EXPERIENCE_TIMESTAMP));

        const customPaletteIndex = model.getValue<number>(RoomObjectVariable.PET_PALETTE_INDEX);
        const customLayerIds = model.getValue<number[]>(RoomObjectVariable.PET_CUSTOM_LAYER_IDS);
        const customPartIds = model.getValue<number[]>(RoomObjectVariable.PET_CUSTOM_PARTS_IDS);
        const customPaletteIds = model.getValue<number[]>(RoomObjectVariable.PET_CUSTOM_PALETTE_IDS);
        const isRiding = model.getValue<number>(RoomObjectVariable.PET_IS_RIDING);
        const headOnly = model.getValue<number>(RoomObjectVariable.PET_HEAD_ONLY);
        const color = model.getValue<number>(RoomObjectVariable.PET_COLOR);

        if(customPaletteIndex !== this._paletteIndex)
        {
            this._paletteIndex = customPaletteIndex;
            this._paletteName = this._paletteIndex.toString();
        }

        this._customLayerIds = (customLayerIds) ? customLayerIds : [];
        this._customPartIds = (customPartIds) ? customPartIds : [];
        this._customPaletteIds = (customPaletteIds) ? customPaletteIds : [];
        this._isRiding = (!isNaN(isRiding) && (isRiding > 0));
        this._headOnly = (!isNaN(headOnly) && (headOnly > 0));

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
        if(!this.data) return;

        if(posture !== this._posture)
        {
            this._posture = posture;

            this.setAnimationForIndex(PetVisualization.POSTURE_ANIMATION_INDEX, this.data.postureToAnimation(this._scale, posture));
        }

        if(this.data.getGestureDisabled(this._scale, posture)) gesture = null;

        if(gesture !== this._gesture)
        {
            this._gesture = gesture;

            this.setAnimationForIndex(PetVisualization.GESTURE_ANIMATION_INDEX, this.data.gestureToAnimation(this._scale, gesture));
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

        let animationOver = true;
        let _local_3 = 0;
        let index = 0;

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
        let offset = super.getLayerXOffset(scale, direction, layerId);
        let index = (this._animationStates.length - 1);

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
        let offset = super.getLayerYOffset(scale, direction, layerId);
        let index = (this._animationStates.length - 1);

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
        if(!this.data) return LayerData.DEFAULT_ZOFFSET;

        return this.data.getLayerZOffset(scale, this.getDirection(scale, layerId), layerId);
    }

    private getDirection(scale: number, layerId: number): number
    {
        if(!this.isHeadSprite(layerId)) return this._direction;

        return this.data.getValidDirection(scale, this._headDirection);
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
            const isHead = (this.data.getLayerTag(this._scale, DirectionData.USE_DEFAULT_DIRECTION, layerId) === PetVisualization.HEAD);
            const isHair = (this.data.getLayerTag(this._scale, DirectionData.USE_DEFAULT_DIRECTION, layerId) === PetVisualization.HAIR);

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
                const tag = this.data.getLayerTag(this._scale, DirectionData.USE_DEFAULT_DIRECTION, layerId);

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
            if(this.data.getLayerTag(this._scale, DirectionData.USE_DEFAULT_DIRECTION, layerId) === PetVisualization.SADDLE)
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

        const layerIndex = this._customLayerIds.indexOf(layerId);
        let paletteName = this._paletteName;
        let partId = -1;
        let paletteId = -1;

        if(layerIndex > -1)
        {
            partId = this._customPartIds[layerIndex];
            paletteId = this._customPaletteIds[layerIndex];
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
        const parts = name.split('_');
        let length = parts.length;
        let i = 0;

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

            posture = this.data.animationToPosture(scale, (parseInt(part) / 100), false);

            if(!posture) posture = this.data.getGestureForAnimationId(scale, (parseInt(part) / 100));
        }

        return posture;
    }

    protected get data(): PetVisualizationData
    {
        return this._data as PetVisualizationData;
    }
}
