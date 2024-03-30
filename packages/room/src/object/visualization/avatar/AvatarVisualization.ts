import { AlphaTolerance, AvatarAction, AvatarGuideStatus, AvatarSetType, IAdvancedMap, IAvatarEffectListener, IAvatarImage, IAvatarImageListener, IGraphicAsset, IObjectVisualizationData, IRoomGeometry, IRoomObject, IRoomObjectModel, RoomObjectSpriteType, RoomObjectVariable } from '@nitrots/api';
import { GetAssetManager } from '@nitrots/assets';
import { AdvancedMap } from '@nitrots/utils';
import { Texture } from 'pixi.js';
import { RoomObjectSpriteVisualization } from '../RoomObjectSpriteVisualization';
import { AvatarVisualizationData } from './AvatarVisualizationData';
import { ExpressionAdditionFactory, FloatingIdleZAddition, GameClickTargetAddition, GuideStatusBubbleAddition, IAvatarAddition, MutedBubbleAddition, NumberBubbleAddition, TypingBubbleAddition } from './additions';

export class AvatarVisualization extends RoomObjectSpriteVisualization implements IAvatarImageListener, IAvatarEffectListener
{
    private static AVATAR: string = 'avatar';
    private static FLOATING_IDLE_Z_ID: number = 1;
    private static TYPING_BUBBLE_ID: number = 2;
    private static EXPRESSION_ID: number = 3;
    private static NUMBER_BUBBLE_ID: number = 4;
    private static GAME_CLICK_TARGET_ID: number = 5;
    private static MUTED_BUBBLE_ID: number = 6;
    private static GUIDE_BUBBLE_ID: number = 7;
    private static OWN_USER_ID: number = 4;
    private static UPDATE_TIME_INCREASER: number = 41;
    private static AVATAR_LAYER_ID: number = 0;
    private static SHADOW_LAYER_ID: number = 1;
    private static SNOWBOARDING_EFFECT: number = 97;
    private static INITIAL_RESERVED_SPRITES: number = 2;
    private static ANIMATION_FRAME_UPDATE_INTERVAL: number = 2;
    private static DEFAULT_CANVAS_OFFSETS: number[] = [0, 0, 0];
    private static MAX_EFFECT_CACHE: number = 2;
    private static SPRITE_INDEX_AVATAR: number = 0;
    private static BASE_Y_SCALE: number = 1000;
    private static AVATAR_SPRITE_DEFAULT_DEPTH: number = -0.01;
    private static AVATAR_OWN_DEPTH_ADJUST: number = 0.001;
    private static AVATAR_SPRITE_LAYING_DEPTH: number = -0.409;

    protected _data: AvatarVisualizationData;

    private _avatarImage: IAvatarImage;
    private _cachedAvatars: IAdvancedMap<string, IAvatarImage>;
    private _cachedAvatarEffects: IAdvancedMap<string, IAvatarImage>;
    private _shadow: IGraphicAsset;
    private _lastUpdate: number;
    private _disposed: boolean;

    private _figure: string;
    private _gender: string;
    private _direction: number;
    private _headDirection: number;
    private _posture: string;
    private _postureParameter: string;
    private _canStandUp: boolean;
    private _postureOffset: number;
    private _verticalOffset: number;
    private _angle: number;
    private _headAngle: number;
    private _talk: boolean;
    private _expression: number;
    private _sleep: boolean;
    private _blink: boolean;
    private _gesture: number;
    private _sign: number;
    private _highlightEnabled: boolean;
    private _highlight: boolean;
    private _dance: number;
    private _effect: number;
    private _carryObject: number;
    private _useObject: number;
    private _ownUser: boolean;

    private _isLaying: boolean;
    private _layInside: boolean;
    private _isAnimating: boolean;
    private _extraSpritesStartIndex: number;
    private _forcedAnimFrames: number;
    private _updatesUntilFrameUpdate: number;

    private _isAvatarReady: boolean;
    private _needsUpdate: boolean;
    private _geometryUpdateCounter: number;

    private _additions: Map<number, IAvatarAddition>;

    constructor()
    {
        super();

        this._data = null;

        this._avatarImage = null;
        this._cachedAvatars = new AdvancedMap();
        this._cachedAvatarEffects = new AdvancedMap();
        this._shadow = null;
        this._lastUpdate = -1000;
        this._disposed = false;

        this._figure = null;
        this._gender = null;
        this._direction = -1;
        this._headDirection = -1;
        this._posture = '';
        this._postureParameter = '';
        this._canStandUp = false;
        this._postureOffset = 0;
        this._verticalOffset = 0;
        this._angle = -1;
        this._headAngle = -1;
        this._talk = false;
        this._expression = 0;
        this._sleep = false;
        this._blink = false;
        this._gesture = 0;
        this._sign = -1;
        this._highlightEnabled = false;
        this._highlight = false;
        this._dance = 0;
        this._effect = 0;
        this._carryObject = 0;
        this._useObject = 0;
        this._ownUser = false;

        this._isLaying = false;
        this._layInside = false;
        this._isAnimating = false;
        this._extraSpritesStartIndex = 2;
        this._forcedAnimFrames = 0;
        this._updatesUntilFrameUpdate = 0;

        this._isAvatarReady = false;
        this._needsUpdate = false;
        this._geometryUpdateCounter = -1;

        this._additions = new Map();
    }

    public initialize(data: IObjectVisualizationData): boolean
    {
        if(!(data instanceof AvatarVisualizationData)) return false;

        this._data = data;

        this.createSprites(AvatarVisualization.INITIAL_RESERVED_SPRITES);

        super.initialize(data);

        return true;
    }

    public dispose(): void
    {
        if(this._disposed) return;

        super.dispose();

        if(this._avatarImage) this._avatarImage.dispose();

        this._shadow = null;
        this._disposed = true;
    }

    public update(geometry: IRoomGeometry, time: number, update: boolean, skipUpdate: boolean): void
    {
        if(!this.object || !geometry || !this._data) return;

        if(time < (this._lastUpdate + AvatarVisualization.UPDATE_TIME_INCREASER)) return;

        this._lastUpdate += AvatarVisualization.UPDATE_TIME_INCREASER;

        if((this._lastUpdate + AvatarVisualization.UPDATE_TIME_INCREASER) < time) this._lastUpdate = (time - AvatarVisualization.UPDATE_TIME_INCREASER);

        const model = this.object.model;
        const scale = geometry.scale;
        const effect = this._effect;

        let didScaleUpdate = false;
        let didEffectUpdate = false;
        let otherUpdate = false;
        let objectUpdate = false;

        const updateModel = this.updateModel(model, scale);

        if((updateModel || (scale !== this._scale)) || !this._avatarImage)
        {
            if(scale !== this._scale)
            {
                didScaleUpdate = true;

                this.updateScale(scale);
            }

            if(effect !== this._effect) didEffectUpdate = true;

            if(didScaleUpdate || !this._avatarImage || didEffectUpdate)
            {
                this._avatarImage = this.createAvatarImage(scale, this._effect);

                if(!this._avatarImage) return;

                otherUpdate = true;

                const sprite = this.getSprite(AvatarVisualization.AVATAR_LAYER_ID);

                if((sprite && this._avatarImage) && this._avatarImage.isPlaceholder())
                {
                    sprite.alpha = 150;
                }

                else if(sprite)
                {
                    sprite.alpha = 255;
                }
            }

            if(!this._avatarImage) return;

            if(didEffectUpdate && this._avatarImage.animationHasResetOnToggle) this._avatarImage.resetAnimationFrameCounter();

            this.updateShadow(scale);

            objectUpdate = this.updateObject(this.object, geometry, update, true);

            this.processActionsForAvatar(this._avatarImage);

            if(this._additions)
            {
                let index = this._extraSpritesStartIndex;

                for(const addition of this._additions.values())
                {
                    addition.update(this.getSprite(index++), scale);
                }
            }

            this._scale = scale;
        }
        else
        {
            objectUpdate = this.updateObject(this.object, geometry, update);
        }

        if(this._additions)
        {
            let index = this._extraSpritesStartIndex;

            for(const addition of this._additions.values())
            {
                if(addition.animate(this.getSprite(index++))) this.updateSpriteCounter++;
            }
        }

        const update1 = (objectUpdate || updateModel || didScaleUpdate);
        const update2 = ((this._isAnimating || (this._forcedAnimFrames > 0)) && update);

        if(update1) this._forcedAnimFrames = AvatarVisualization.ANIMATION_FRAME_UPDATE_INTERVAL;

        if(update1 || update2)
        {
            this.updateSpriteCounter++;

            this._forcedAnimFrames--;
            this._updatesUntilFrameUpdate--;

            if((((this._updatesUntilFrameUpdate <= 0) || didScaleUpdate) || updateModel) || otherUpdate)
            {
                this._avatarImage.updateAnimationByFrames(1);

                this._updatesUntilFrameUpdate = AvatarVisualization.ANIMATION_FRAME_UPDATE_INTERVAL;
            }
            else
            {
                return;
            }

            let _local_20 = this._avatarImage.getCanvasOffsets();

            if(!_local_20 || (_local_20.length < 3)) _local_20 = AvatarVisualization.DEFAULT_CANVAS_OFFSETS;

            const sprite = this.getSprite(AvatarVisualization.SPRITE_INDEX_AVATAR);

            if(sprite)
            {
                const highlightEnabled = ((this.object.model.getValue<number>(RoomObjectVariable.FIGURE_HIGHLIGHT_ENABLE) === 1) && (this.object.model.getValue<number>(RoomObjectVariable.FIGURE_HIGHLIGHT) === 1));
                const avatarImage = this._avatarImage.processAsTexture(AvatarSetType.FULL, highlightEnabled);

                if(avatarImage)
                {
                    sprite.texture = avatarImage;

                    if(highlightEnabled)
                    {
                        // sprite.filters  = [
                        //     new GlowFilter({
                        //         color: 0xFFFFFF,
                        //         distance: 6
                        //     })
                        // ];
                    }
                    else
                    {
                        sprite.filters = [];
                    }
                }

                if(sprite.texture)
                {
                    sprite.offsetX = ((((-1 * scale) / 2) + _local_20[0]) - ((sprite.texture.width - scale) / 2));
                    sprite.offsetY = (((-(sprite.texture.height) + (scale / 4)) + _local_20[1]) + this._postureOffset);
                }

                if(this._isLaying)
                {
                    if(this._layInside) sprite.relativeDepth = -0.5;
                    else sprite.relativeDepth = (AvatarVisualization.AVATAR_SPRITE_LAYING_DEPTH + _local_20[2]);
                }
                else
                {
                    sprite.relativeDepth = (AvatarVisualization.AVATAR_SPRITE_DEFAULT_DEPTH + _local_20[2]);
                }

                if(this._ownUser)
                {
                    sprite.relativeDepth -= AvatarVisualization.AVATAR_OWN_DEPTH_ADJUST;
                    sprite.spriteType = RoomObjectSpriteType.AVATAR_OWN;
                }
                else
                {
                    sprite.spriteType = RoomObjectSpriteType.AVATAR;
                }
            }

            const typingBubble = this.getAddition(AvatarVisualization.TYPING_BUBBLE_ID) as TypingBubbleAddition;

            if(typingBubble)
            {
                if(!this._isLaying) typingBubble.relativeDepth = ((AvatarVisualization.AVATAR_SPRITE_DEFAULT_DEPTH - 0.01) + _local_20[2]);
                else typingBubble.relativeDepth = ((AvatarVisualization.AVATAR_SPRITE_LAYING_DEPTH - 0.01) + _local_20[2]);
            }

            this._isAnimating = this._avatarImage.isAnimating();

            let _local_21 = AvatarVisualization.INITIAL_RESERVED_SPRITES;
            const direction = this._avatarImage.getDirection();

            for(const spriteData of this._avatarImage.getSprites())
            {
                if(spriteData.id === AvatarVisualization.AVATAR)
                {
                    const sprite = this.getSprite(AvatarVisualization.SPRITE_INDEX_AVATAR);

                    if(sprite)
                    {
                        const layerData = this._avatarImage.getLayerData(spriteData);

                        let offsetX = spriteData.getDirectionOffsetX(direction);
                        let offsetY = spriteData.getDirectionOffsetY(direction);

                        if(layerData)
                        {
                            offsetX += layerData.dx;
                            offsetY += layerData.dy;
                        }

                        if(scale < 48)
                        {
                            offsetX /= 2;
                            offsetY /= 2;
                        }

                        if(!this._canStandUp)
                        {
                            sprite.offsetX += offsetX;
                            sprite.offsetY += offsetY;
                        }
                    }
                }
                else
                {
                    const sprite = this.getSprite(_local_21);

                    if(sprite)
                    {
                        sprite.alphaTolerance = AlphaTolerance.MATCH_NOTHING;
                        sprite.visible = true;

                        const layerData = this._avatarImage.getLayerData(spriteData);

                        let frameNumber = 0;
                        let offsetX = spriteData.getDirectionOffsetX(direction);
                        let offsetY = spriteData.getDirectionOffsetY(direction);
                        const offsetZ = spriteData.getDirectionOffsetZ(direction);
                        let dd = 0;

                        if(spriteData.hasDirections) dd = direction;

                        if(layerData)
                        {
                            frameNumber = layerData.animationFrame;
                            offsetX += layerData.dx;
                            offsetY += layerData.dy;
                            dd += layerData.dd;
                        }

                        if(scale < 48)
                        {
                            offsetX /= 2;
                            offsetY /= 2;
                        }

                        if(dd < 0) dd += 8;
                        else
                        {
                            if(dd > 7) dd -= 8;
                        }

                        const assetName = ((((((this._avatarImage.getScale() + '_') + spriteData.member) + '_') + dd) + '_') + frameNumber);

                        const asset = GetAssetManager().getAsset(assetName);

                        if(!asset) continue;

                        sprite.texture = asset.texture;
                        sprite.offsetX = ((asset.offsetX - (scale / 2)) + offsetX);
                        sprite.offsetY = (asset.offsetY + offsetY);
                        sprite.flipH = asset.flipH;

                        if(spriteData.hasStaticY)
                        {
                            sprite.offsetY += ((this._verticalOffset * scale) / (2 * AvatarVisualization.BASE_Y_SCALE));
                        }
                        else
                        {
                            sprite.offsetY += this._postureOffset;
                        }

                        if(this._isLaying)
                        {
                            sprite.relativeDepth = (AvatarVisualization.AVATAR_SPRITE_LAYING_DEPTH - ((0.001 * this.totalSprites) * offsetZ));
                        }
                        else
                        {
                            sprite.relativeDepth = (AvatarVisualization.AVATAR_SPRITE_DEFAULT_DEPTH - ((0.001 * this.totalSprites) * offsetZ));
                        }

                        if(spriteData.ink === 33) sprite.blendMode = 'add';
                        else sprite.blendMode = 'normal';
                    }

                    _local_21++;
                }
            }
        }
    }

    private createAvatarImage(scale: number, effectId: number): IAvatarImage
    {
        let cachedImage: IAvatarImage = null;
        let imageName = 'avatarImage' + scale.toString();

        if(!effectId)
        {
            cachedImage = this._cachedAvatars.getValue(imageName);
        }
        else
        {
            imageName += '-' + effectId;

            cachedImage = this._cachedAvatarEffects.getValue(imageName);
        }

        if(!cachedImage)
        {
            cachedImage = this._data.createAvatarImage(this._figure, scale, this._gender, this, this);

            if(cachedImage)
            {
                if(!effectId)
                {
                    this._cachedAvatars.add(imageName, cachedImage);
                }

                else
                {
                    if(this._cachedAvatarEffects.length >= AvatarVisualization.MAX_EFFECT_CACHE)
                    {
                        const cached = this._cachedAvatarEffects.remove(this._cachedAvatarEffects.getKey(0));

                        if(cached) cached.dispose();
                    }

                    this._cachedAvatarEffects.add(imageName, cachedImage);
                }
            }
        }

        return cachedImage;
    }

    protected updateObject(object: IRoomObject, geometry: IRoomGeometry, update: boolean, _arg_4: boolean = false): boolean
    {
        if((!_arg_4 && (this.updateObjectCounter === object.updateCounter)) && (this._geometryUpdateCounter === geometry.updateId)) return false;

        let direction = (object.getDirection().x - geometry.direction.x);
        let headDirection = (this._headDirection - geometry.direction.x);

        if(this._posture === 'float') headDirection = direction;

        direction = (((direction % 360) + 360) % 360);
        headDirection = (((headDirection % 360) + 360) % 360);

        if((this._posture === 'sit') && this._canStandUp)
        {
            direction -= ((direction % 90) - 45);
            headDirection -= ((headDirection % 90) - 45);
        }

        if((direction !== this._angle) || _arg_4)
        {
            update = true;

            this._angle = direction;

            direction = (direction - (135 - 22.5));
            direction = ((direction + 360) % 360);

            this._avatarImage.setDirectionAngle(AvatarSetType.FULL, direction);
        }

        if((headDirection !== this._headAngle) || _arg_4)
        {
            update = true;

            this._headAngle = headDirection;

            if(this._headAngle !== this._angle)
            {
                headDirection = (headDirection - (135 - 22.5));
                headDirection = ((headDirection + 360) % 360);

                this._avatarImage.setDirectionAngle(AvatarSetType.HEAD, headDirection);
            }
        }

        this._geometryUpdateCounter = geometry.updateId;

        this.updateObjectCounter = this.object.updateCounter;

        return update;
    }

    protected updateModel(model: IRoomObjectModel, scale: number): boolean
    {
        if(!model) return false;

        if(this.updateModelCounter === model.updateCounter) return false;

        let needsUpdate = false;

        const talk = (model.getValue<number>(RoomObjectVariable.FIGURE_TALK) > 0);

        if(talk !== this._talk)
        {
            this._talk = talk;

            needsUpdate = true;
        }

        const expression = model.getValue<number>(RoomObjectVariable.FIGURE_EXPRESSION);

        if(expression !== this._expression)
        {
            this._expression = expression;

            needsUpdate = true;
        }

        const sleep = (model.getValue<number>(RoomObjectVariable.FIGURE_SLEEP) > 0);

        if(sleep !== this._sleep)
        {
            this._sleep = sleep;

            needsUpdate = true;
        }

        const blink = (model.getValue<number>(RoomObjectVariable.FIGURE_BLINK) > 0);

        if(blink !== this._blink)
        {
            this._blink = blink;

            needsUpdate = true;
        }

        const gesture = (model.getValue<number>(RoomObjectVariable.FIGURE_GESTURE) || 0);

        if(gesture !== this._gesture)
        {
            this._gesture = gesture;

            needsUpdate = true;
        }

        const posture = model.getValue<string>(RoomObjectVariable.FIGURE_POSTURE);

        if(posture !== this._posture)
        {
            this._posture = posture;

            needsUpdate = true;
        }

        const postureParameter = model.getValue<string>(RoomObjectVariable.FIGURE_POSTURE_PARAMETER);

        if(postureParameter !== this._postureParameter)
        {
            this._postureParameter = postureParameter;

            needsUpdate = true;
        }

        const canStandUp = model.getValue<boolean>(RoomObjectVariable.FIGURE_CAN_STAND_UP);

        if(canStandUp !== this._canStandUp)
        {
            this._canStandUp = canStandUp;

            needsUpdate = true;
        }

        const verticalOffset = (model.getValue<number>(RoomObjectVariable.FIGURE_VERTICAL_OFFSET) * AvatarVisualization.BASE_Y_SCALE);

        if(verticalOffset !== this._verticalOffset)
        {
            this._verticalOffset = verticalOffset;

            needsUpdate = true;
        }

        const dance = (model.getValue<number>(RoomObjectVariable.FIGURE_DANCE) || 0);

        if(dance !== this._dance)
        {
            this._dance = dance;

            needsUpdate = true;
        }

        const effect = (model.getValue<number>(RoomObjectVariable.FIGURE_EFFECT) || 0);

        if(effect !== this._effect)
        {
            this._effect = effect;

            needsUpdate = true;
        }

        const carryObject = (model.getValue<number>(RoomObjectVariable.FIGURE_CARRY_OBJECT) || 0);

        if(carryObject !== this._carryObject)
        {
            this._carryObject = carryObject;

            needsUpdate = true;
        }

        const useObject = (model.getValue<number>(RoomObjectVariable.FIGURE_USE_OBJECT) || 0);

        if(useObject !== this._useObject)
        {
            this._useObject = useObject;

            needsUpdate = true;
        }

        const headDirection = model.getValue<number>(RoomObjectVariable.HEAD_DIRECTION);

        if(headDirection !== this._headDirection)
        {
            this._headDirection = headDirection;

            needsUpdate = true;
        }

        if((this._carryObject > 0) && (useObject > 0))
        {
            if(this._useObject !== this._carryObject)
            {
                this._useObject = this._carryObject;

                needsUpdate = true;
            }
        }
        else
        {
            if(this._useObject !== 0)
            {
                this._useObject = 0;

                needsUpdate = true;
            }
        }

        let idleAddition = this.getAddition(AvatarVisualization.FLOATING_IDLE_Z_ID);

        if(this._sleep)
        {
            if(!idleAddition) idleAddition = this.addAddition(new FloatingIdleZAddition(AvatarVisualization.FLOATING_IDLE_Z_ID, this));

            needsUpdate = true;
        }
        else
        {
            if(idleAddition) this.removeAddition(AvatarVisualization.FLOATING_IDLE_Z_ID);
        }

        const isMuted = (model.getValue<number>(RoomObjectVariable.FIGURE_IS_MUTED) > 0);

        let mutedAddition = this.getAddition(AvatarVisualization.MUTED_BUBBLE_ID);

        if(isMuted)
        {
            if(!mutedAddition) mutedAddition = this.addAddition(new MutedBubbleAddition(AvatarVisualization.MUTED_BUBBLE_ID, this));

            needsUpdate = true;
        }
        else
        {
            if(mutedAddition)
            {
                this.removeAddition(AvatarVisualization.MUTED_BUBBLE_ID);

                needsUpdate = true;
            }

            const isTyping = (model.getValue<number>(RoomObjectVariable.FIGURE_IS_TYPING) > 0);

            let typingAddition = this.getAddition(AvatarVisualization.TYPING_BUBBLE_ID);

            if(isTyping)
            {
                if(!typingAddition) typingAddition = this.addAddition(new TypingBubbleAddition(AvatarVisualization.TYPING_BUBBLE_ID, this));

                needsUpdate = true;
            }
            else
            {
                if(typingAddition)
                {
                    this.removeAddition(AvatarVisualization.TYPING_BUBBLE_ID);

                    needsUpdate = true;
                }
            }
        }

        const guideStatusValue = (model.getValue<number>(RoomObjectVariable.FIGURE_GUIDE_STATUS) || 0);

        if(guideStatusValue !== AvatarGuideStatus.NONE)
        {
            this.removeAddition(AvatarVisualization.GUIDE_BUBBLE_ID);
            this.addAddition(new GuideStatusBubbleAddition(AvatarVisualization.GUIDE_BUBBLE_ID, this, guideStatusValue));

            needsUpdate = true;
        }
        else
        {
            if(this.getAddition(AvatarVisualization.GUIDE_BUBBLE_ID))
            {
                this.removeAddition(AvatarVisualization.GUIDE_BUBBLE_ID);

                needsUpdate = true;
            }
        }

        const isPlayingGame = (model.getValue<number>(RoomObjectVariable.FIGURE_IS_PLAYING_GAME) > 0);

        let gameClickAddition = this.getAddition(AvatarVisualization.GAME_CLICK_TARGET_ID);

        if(isPlayingGame)
        {
            if(!gameClickAddition) gameClickAddition = this.addAddition(new GameClickTargetAddition(AvatarVisualization.GAME_CLICK_TARGET_ID));

            needsUpdate = true;
        }
        else
        {
            if(gameClickAddition) this.removeAddition(AvatarVisualization.GAME_CLICK_TARGET_ID);
        }

        const numberValue = model.getValue<number>(RoomObjectVariable.FIGURE_NUMBER_VALUE);

        let numberAddition = this.getAddition(AvatarVisualization.NUMBER_BUBBLE_ID);

        if(numberValue > 0)
        {
            if(!numberAddition) numberAddition = this.addAddition(new NumberBubbleAddition(AvatarVisualization.NUMBER_BUBBLE_ID, numberValue, this));

            needsUpdate = true;
        }
        else
        {
            if(numberAddition) this.removeAddition(AvatarVisualization.NUMBER_BUBBLE_ID);
        }

        let expressionAddition = this.getAddition(AvatarVisualization.EXPRESSION_ID);

        if(this._expression > 0)
        {
            if(!expressionAddition)
            {
                expressionAddition = ExpressionAdditionFactory.getExpressionAddition(AvatarVisualization.EXPRESSION_ID, this._expression, this);

                if(expressionAddition) this.addAddition(expressionAddition);
            }
        }
        else
        {
            if(expressionAddition) this.removeAddition(AvatarVisualization.EXPRESSION_ID);
        }

        this.updateScale(scale);

        const gender = model.getValue<string>(RoomObjectVariable.GENDER);

        if(gender !== this._gender)
        {
            this._gender = gender;

            needsUpdate = true;
        }

        if(this.updateFigure(model.getValue<string>(RoomObjectVariable.FIGURE))) needsUpdate = true;

        let sign = model.getValue<number>(RoomObjectVariable.FIGURE_SIGN);

        if(sign === null) sign = -1;

        if(this._sign !== sign)
        {
            this._sign = sign;

            needsUpdate = true;
        }

        const highlightEnabled = (model.getValue<number>(RoomObjectVariable.FIGURE_HIGHLIGHT_ENABLE) > 0);

        if(highlightEnabled !== this._highlightEnabled)
        {
            this._highlightEnabled = highlightEnabled;

            needsUpdate = true;
        }

        if(this._highlightEnabled)
        {
            const highlight = (model.getValue<number>(RoomObjectVariable.FIGURE_HIGHLIGHT) > 0);

            if(highlight !== this._highlight)
            {
                this._highlight = highlight;

                needsUpdate = true;
            }
        }

        const ownUser = (model.getValue<number>(RoomObjectVariable.OWN_USER) > 0);

        if(ownUser !== this._ownUser)
        {
            this._ownUser = ownUser;

            needsUpdate = true;
        }

        this.updateModelCounter = model.updateCounter;

        return needsUpdate;
    }

    protected setDirection(direction: number): void
    {
        if(this._direction === direction) return;

        this._direction = direction;

        this._needsUpdate = true;
    }

    private updateScale(scale: number): void
    {
        if(scale < 48) this._blink = false;

        if((this._posture === 'sit') || (this._posture === 'lay'))
        {
            this._postureOffset = (scale / 2);
        }
        else
        {
            this._postureOffset = 0;
        }

        this._layInside = false;
        this._isLaying = false;

        if(this._posture === 'lay')
        {
            this._isLaying = true;

            const _local_2 = parseInt(this._postureParameter);

            if(_local_2 < 0) this._layInside = true;
        }
    }

    private processActionsForAvatar(avatar: IAvatarImage): void
    {
        if(!avatar) return;

        avatar.initActionAppends();

        avatar.appendAction(AvatarAction.POSTURE, this._posture, this._postureParameter);

        if(this._gesture > 0) this._avatarImage.appendAction(AvatarAction.GESTURE, AvatarAction.getGesture(this._gesture));

        if(this._dance > 0) this._avatarImage.appendAction(AvatarAction.DANCE, this._dance);

        if(this._sign > -1) this._avatarImage.appendAction(AvatarAction.SIGN, this._sign);

        if(this._carryObject > 0) this._avatarImage.appendAction(AvatarAction.CARRY_OBJECT, this._carryObject);

        if(this._useObject > 0) this._avatarImage.appendAction(AvatarAction.USE_OBJECT, this._useObject);

        if(this._talk) this._avatarImage.appendAction(AvatarAction.TALK);

        if(this._sleep || this._blink) this._avatarImage.appendAction(AvatarAction.SLEEP);

        if(this._expression > 0)
        {
            const expression = AvatarAction.getExpression(this._expression);

            if(expression !== '')
            {
                switch(expression)
                {
                    case AvatarAction.DANCE:
                        this._avatarImage.appendAction(AvatarAction.DANCE, 2);
                        break;
                    default:
                        this._avatarImage.appendAction(expression);
                        break;
                }
            }
        }

        if(this._effect > 0) this._avatarImage.appendAction(AvatarAction.EFFECT, this._effect);

        avatar.endActionAppends();

        this._isAnimating = avatar.isAnimating();

        let spriteCount = AvatarVisualization.INITIAL_RESERVED_SPRITES;

        for(const sprite of this._avatarImage.getSprites())
        {
            if(sprite.id !== AvatarVisualization.AVATAR) spriteCount++;
        }

        if(spriteCount !== this.totalSprites) this.createSprites(spriteCount);

        this._extraSpritesStartIndex = spriteCount;

        if(this._additions)
        {
            for(const addition of this._additions.values()) this.createSprite();
        }
    }

    private updateFigure(figure: string): boolean
    {
        if(this._figure === figure) return false;

        this._figure = figure;

        this.clearAvatar();

        return true;
    }

    public resetFigure(figure: string): void
    {
        this.clearAvatar();
    }

    public resetEffect(effect: number): void
    {
        this.clearAvatar();
    }

    private clearAvatar(): void
    {
        const sprite = this.getSprite(AvatarVisualization.AVATAR_LAYER_ID);

        if(sprite)
        {
            sprite.texture = Texture.EMPTY;
            sprite.alpha = 255;
        }

        for(const avatar of this._cachedAvatars.getValues()) avatar && avatar.dispose();

        for(const avatar of this._cachedAvatarEffects.getValues()) avatar && avatar.dispose();

        this._cachedAvatars.reset();
        this._cachedAvatarEffects.reset();

        this._avatarImage = null;
    }

    private getAddition(id: number): IAvatarAddition
    {
        if(!this._additions) return null;

        const existing = this._additions.get(id);

        if(!existing) return null;

        return existing;
    }

    private addAddition(addition: IAvatarAddition): IAvatarAddition
    {
        const existing = this.getAddition(addition.id);

        if(existing) return;

        this._additions.set(addition.id, addition);

        return addition;
    }

    private removeAddition(id: number): void
    {
        const addition = this.getAddition(id);

        if(!addition) return;

        this._additions.delete(addition.id);

        addition.dispose();
    }

    private updateShadow(scale: number): void
    {
        this._shadow = null;

        const sprite = this.getSprite(AvatarVisualization.SHADOW_LAYER_ID);

        if(!sprite) return;

        let hasShadow = (((this._posture === 'mv') || (this._posture === 'std')) || ((this._posture === 'sit') && this._canStandUp));

        if(this._effect === AvatarVisualization.SNOWBOARDING_EFFECT) hasShadow = false;

        if(hasShadow)
        {
            sprite.visible = true;

            if(!this._shadow || (scale !== this._scale))
            {
                let offsetX = 0;
                let offsetY = 0;

                if(scale < 48)
                {
                    sprite.libraryAssetName = 'sh_std_sd_1_0_0';

                    this._shadow = GetAssetManager().getAsset(sprite.libraryAssetName);

                    offsetX = -8;
                    offsetY = ((this._canStandUp) ? 6 : -3);
                }
                else
                {
                    sprite.libraryAssetName = 'h_std_sd_1_0_0';

                    this._shadow = GetAssetManager().getAsset(sprite.libraryAssetName);

                    offsetX = -17;
                    offsetY = ((this._canStandUp) ? 10 : -7);
                }

                if(this._shadow)
                {
                    sprite.texture = this._shadow.texture;
                    sprite.offsetX = offsetX;
                    sprite.offsetY = offsetY;
                    sprite.alpha = 50;
                    sprite.relativeDepth = 1;
                }
                else
                {
                    sprite.visible = false;
                }
            }
        }
        else
        {
            this._shadow = null;

            sprite.visible = false;
        }
    }

    public get direction(): number
    {
        return this._direction;
    }

    public get posture(): string
    {
        return this._posture;
    }

    public get angle(): number
    {
        return this._angle;
    }

    public get disposed(): boolean
    {
        return this._disposed;
    }
}
