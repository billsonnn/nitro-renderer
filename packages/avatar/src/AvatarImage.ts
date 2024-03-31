import { AvatarAction, AvatarDirectionAngle, AvatarScaleType, AvatarSetType, IActiveActionData, IAnimationLayerData, IAvatarDataContainer, IAvatarEffectListener, IAvatarFigureContainer, IAvatarImage, IPartColor, ISpriteDataContainer } from '@nitrots/api';
import { GetRenderer, GetTexturePool, GetTickerTime, PaletteMapFilter, TextureUtils } from '@nitrots/utils';
import { ColorMatrixFilter, Container, RenderTexture, Sprite, Texture } from 'pixi.js';
import { AvatarFigureContainer } from './AvatarFigureContainer';
import { AvatarStructure } from './AvatarStructure';
import { EffectAssetDownloadManager } from './EffectAssetDownloadManager';
import { ActiveActionData } from './actions';
import { AssetAliasCollection } from './alias';
import { AvatarImageCache } from './cache';
import { AvatarCanvas } from './structure';

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

    protected _mainDirection: number;
    protected _headDirection: number;
    protected _mainAction: IActiveActionData;
    protected _disposed: boolean = false;
    protected _canvasOffsets: number[] = [];
    protected _cache: AvatarImageCache;
    protected _avatarSpriteData: IAvatarDataContainer;
    protected _actions: ActiveActionData[] = [];
    protected _activeTexture: Texture = null;

    private _defaultAction: IActiveActionData = null;
    private _frameCounter: number = 0;
    private _directionOffset: number = 0;
    private _changes: boolean = true;
    private _sprites: ISpriteDataContainer[];
    private _isAnimating: boolean = false;
    private _animationHasResetOnToggle: boolean = false;
    private _actionsSorted: boolean = false;
    private _sortedActions: IActiveActionData[];
    private _lastActionsString: string = null;
    private _currentActionsString: string = null;
    private _effectIdInUse: number = -1;
    private _animationFrameCount: number = -1;
    private _cachedBodyParts: string[] = [];
    private _cachedBodyPartsDirection: number = -1;
    private _cachedBodyPartsGeometryType: string = null;
    private _cachedBodyPartsAvatarSet: string = null;

    constructor(
        private _structure: AvatarStructure,
        private _assets: AssetAliasCollection,
        private _figure: AvatarFigureContainer,
        private _scale: string,
        private _effectManager: EffectAssetDownloadManager,
        private _effectListener: IAvatarEffectListener = null)
    {
        if(!this._figure) this._figure = new AvatarFigureContainer('hr-893-45.hd-180-2.ch-210-66.lg-270-82.sh-300-91.wa-2007-.ri-1-');
        if(!this._scale) this._scale = AvatarScaleType.LARGE;

        this._cache = new AvatarImageCache(this._structure, this, this._assets, this._scale);
        this.setDirection(AvatarImage.DEFAULT_AVATAR_SET, AvatarImage.DEFAULT_DIRECTION);
        this._defaultAction = new ActiveActionData(AvatarAction.POSTURE_STAND);
        this._defaultAction.definition = this._structure.getActionDefinition(AvatarImage.DEFAULT_ACTION);
        this.resetActions();
        this._animationFrameCount = 0;
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

        if(this._activeTexture)
        {
            GetTexturePool().putTexture(this._activeTexture);

            this._activeTexture = null;
        }

        if(this._cache)
        {
            this._cache.dispose();
            this._cache = null;
        }

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

    public setDirection(avatarPart: string, direction: number): void
    {
        direction += this._directionOffset;

        if(direction < AvatarDirectionAngle.MIN_DIRECTION)
        {
            direction = AvatarDirectionAngle.MAX_DIRECTION + (direction + 1);
        }
        else if(direction > AvatarDirectionAngle.MAX_DIRECTION)
        {
            direction -= (AvatarDirectionAngle.MAX_DIRECTION + 1);
        }

        if(this._structure.isMainAvatarSet(avatarPart)) this._mainDirection = direction;

        // Special handling for head direction, including prevention checks for turning
        if(avatarPart === AvatarSetType.HEAD || avatarPart === AvatarSetType.FULL)
        {
            if(avatarPart === AvatarSetType.HEAD && this.isHeadTurnPreventedByAction()) direction = this._mainDirection;

            this._headDirection = direction;
        }

        this._cache.setDirection(avatarPart, direction);
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

    private getBodyParts(avatarSet: string, geometryType: string, direction: number): string[]
    {
        const shouldUpdateCache = direction !== this._cachedBodyPartsDirection || geometryType !== this._cachedBodyPartsGeometryType || avatarSet !== this._cachedBodyPartsAvatarSet;

        if(shouldUpdateCache)
        {
            this._cachedBodyPartsDirection = direction;
            this._cachedBodyPartsGeometryType = geometryType;
            this._cachedBodyPartsAvatarSet = avatarSet;

            this._cachedBodyParts = this._structure.getBodyParts(avatarSet, geometryType, direction);
        }

        return this._cachedBodyParts;
    }

    private buildAvatarContainer(avatarCanvas: AvatarCanvas, setType: string): Container
    {
        const bodyParts = this.getBodyParts(setType, this._mainAction.definition.geometryType, this._mainDirection);
        const container = new Container();

        let partCount = (bodyParts.length - 1);

        while(partCount >= 0)
        {
            const set = bodyParts[partCount];
            const part = this._cache.getImageContainer(set, this._frameCounter);

            if(part)
            {
                const partCacheContainer = part.image;

                if(partCacheContainer)
                {
                    const partContainer = new Container();

                    partContainer.addChild(partCacheContainer);

                    const point = part.regPoint.clone();

                    point.x += avatarCanvas.offset.x;
                    point.y += avatarCanvas.offset.y;

                    point.x += avatarCanvas.regPoint.x;
                    point.y += avatarCanvas.regPoint.y;

                    partContainer.position.set(point.x, point.y);

                    container.addChild(partContainer);
                }
            }

            partCount--;
        }

        container.filters = [];

        if(this._avatarSpriteData)
        {
            if(this._avatarSpriteData.colorTransform)
            {
                if(container.filters === undefined || container.filters === null) container.filters = [ this._avatarSpriteData.colorTransform ];
                else if(Array.isArray(container.filters)) container.filters = [ ...container.filters, this._avatarSpriteData.colorTransform ];
                else container.filters = [ container.filters, this._avatarSpriteData.colorTransform ];
            }

            if(this._avatarSpriteData.paletteIsGrayscale)
            {
                this.convertToGrayscale(container);

                const paletteMapFilter = new PaletteMapFilter({
                    palette: this._avatarSpriteData.reds,
                    channel: PaletteMapFilter.CHANNEL_RED
                });

                if(container.filters === undefined || container.filters === null) container.filters = [ paletteMapFilter ];
                else if(Array.isArray(container.filters)) container.filters = [ ...container.filters, paletteMapFilter ];
                else container.filters = [ container.filters, paletteMapFilter ];
            }
        }

        return container;
    }

    public processAsTexture(setType: string, hightlight: boolean): Texture
    {
        if(!this._changes) return this._activeTexture;

        if(!this._mainAction) return null;

        if(!this._actionsSorted) this.endActionAppends();

        const avatarCanvas = this._structure.getCanvas(this._scale, this._mainAction.definition.geometryType);

        if(!avatarCanvas) return null;

        const container = this.buildAvatarContainer(avatarCanvas, setType);

        if(this._activeTexture && ((this._activeTexture.width !== avatarCanvas.width) || (this._activeTexture.height !== avatarCanvas.height)))
        {
            GetTexturePool().putTexture(this._activeTexture);

            this._activeTexture = null;
        }

        if(!this._activeTexture) this._activeTexture = GetTexturePool().getTexture(avatarCanvas.width, avatarCanvas.height);

        if(!this._activeTexture) return null;

        GetRenderer().render({
            target: this._activeTexture,
            container: container,
            clear: true
        });

        container.destroy();

        //@ts-ignore
        this._activeTexture.source.hitMap = null;

        this._changes = false;

        return this._activeTexture;
    }

    public processAsImageUrl(setType: string, scale: number = 1): string
    {
        const texture = this.processAsTexture(setType, false);
        const canvas = GetRenderer().texture.generateCanvas(texture);

        const url = canvas.toDataURL('image/png');

        return url;
    }

    public processAsContainer(setType: string): Container
    {
        if(!this._mainAction) return null;

        if(!this._actionsSorted) this.endActionAppends();

        const avatarCanvas = this._structure.getCanvas(this._scale, this._mainAction.definition.geometryType);

        if(!avatarCanvas) return null;

        return this.buildAvatarContainer(avatarCanvas, setType);
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

        TextureUtils.writeToTexture(newTexture, texture, true);

        return texture;
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
    }

    public endActionAppends(): void
    {
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
                        //
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

    protected addActionData(actionType: string, actionParameter: string = ''): void
    {
        if(!this._actions) this._actions = [];

        const actionExists = this._actions.some(action =>
            action.actionType === actionType && action.actionParameter === actionParameter
        );

        if(!actionExists) this._actions.push(new ActiveActionData(actionType, actionParameter, this._frameCounter));
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
        if(!this._sortedActions) return false;

        for(const action of this._sortedActions)
        {
            const actionDefinition = this._structure.getActionDefinitionWithState(action.actionType);

            if(actionDefinition != null && actionDefinition.getPreventHeadTurn(action.actionParameter)) return true;
        }

        return false;
    }

    private sortActions(): boolean
    {
        let hasChanges = false;
        let hasEffectAction = false;
        let effectChanged = false;

        this._currentActionsString = '';
        this._sortedActions = this._structure.sortActions(this._actions);
        this._animationFrameCount = this._structure.maxFrames(this._sortedActions);

        if(!this._sortedActions)
        {
            this._canvasOffsets = [0, 0, 0];

            if(this._lastActionsString !== '')
            {
                hasChanges = true;

                this._lastActionsString = '';
            }
        }
        else
        {
            this._canvasOffsets = this._structure.getCanvasOffsets(this._sortedActions, this._scale, this._mainDirection);

            for(const action of this._sortedActions)
            {
                this._currentActionsString += action.actionType + action.actionParameter;

                if(action.actionType === AvatarAction.EFFECT)
                {
                    const effectId = parseInt(action.actionParameter);

                    if(this._effectIdInUse !== effectId) effectChanged = true;

                    this._effectIdInUse = effectId;

                    hasEffectAction = true;
                }
            }

            if(!hasEffectAction)
            {
                if(this._effectIdInUse > -1) effectChanged = true;

                this._effectIdInUse = -1;
            }

            if(effectChanged) this._cache.disposeInactiveActions();

            if(this._lastActionsString != this._currentActionsString)
            {
                hasChanges = true;

                this._lastActionsString = this._currentActionsString;
            }
        }

        this._actionsSorted = true;

        return hasChanges;
    }

    private setActionsToParts(): void
    {
        if(!this._sortedActions) return;

        const currentTime = GetTickerTime();
        const actionTypes: string[] = [];

        for(const action of this._sortedActions) actionTypes.push(action.actionType);

        for(const action of this._sortedActions)
        {
            if(action && action.definition && action.definition.isAnimation)
            {
                const animation = this._structure.getAnimation(`${action.definition.state}.${action.actionParameter}`);

                if(animation && animation.hasOverriddenActions())
                {
                    const overriddenActionNames = animation.overriddenActionNames();

                    if(overriddenActionNames)
                    {
                        for(const overriddenActionName of overriddenActionNames)
                        {
                            if(actionTypes.includes(overriddenActionName)) action.overridingAction = animation.overridingAction(overriddenActionName);
                        }
                    }
                }

                if(animation && animation.resetOnToggle) this._animationHasResetOnToggle = true;
            }
        }

        for(const action of this._sortedActions)
        {
            if(action && action.definition)
            {
                if(action.definition.isAnimation && action.actionParameter === '') action.actionParameter = '1';

                this.setActionToParts(action, currentTime);

                if(action.definition.isAnimation)
                {
                    this._isAnimating = action.definition.isAnimated(action.actionParameter);

                    const animation = this._structure.getAnimation(`${action.definition.state}.${action.actionParameter}`);

                    if(animation)
                    {
                        this._sprites = [...this._sprites, ...animation.spriteData];

                        if(animation.hasDirectionData()) this._directionOffset = animation.directionData.offset;

                        if(animation.hasAvatarData()) this._avatarSpriteData = animation.avatarData;
                    }
                }
            }
        }
    }

    private setActionToParts(action: IActiveActionData, currentTime: number): void
    {
        if(!action || !action.definition || action.definition.assetPartDefinition === '') return;

        if(action.definition.isMain)
        {
            this._mainAction = action;
            this._cache.setGeometryType(action.definition.geometryType);
        }

        this._cache.setAction(action, currentTime);

        this._changes = true;
    }

    private resetBodyPartCache(action: IActiveActionData): void
    {
        if(!action || action.definition.assetPartDefinition === '') return;

        if(action.definition.isMain)
        {
            this._mainAction = action;
            this._cache.setGeometryType(action.definition.geometryType);
        }

        this._cache.resetBodyPartCache(action);

        this._changes = true;
    }

    private convertToGrayscale(container: Container, channel: string = 'CHANNELS_EQUAL'): Container
    {
        let redWeight = 0.33;
        let greenWeight = 0.33;
        let blueWeight = 0.33;

        switch(channel)
        {
            case AvatarImage.CHANNELS_UNIQUE:
                redWeight = 0.3;
                greenWeight = 0.59;
                blueWeight = 0.11;
                break;
            case AvatarImage.CHANNELS_RED:
                redWeight = 1;
                greenWeight = 0;
                blueWeight = 0;
                break;
            case AvatarImage.CHANNELS_GREEN:
                redWeight = 0;
                greenWeight = 1;
                blueWeight = 0;
                break;
            case AvatarImage.CHANNELS_BLUE:
                redWeight = 0;
                greenWeight = 0;
                blueWeight = 1;
                break;
            case AvatarImage.CHANNELS_DESATURATED:
                redWeight = 0.3086;
                greenWeight = 0.6094;
                blueWeight = 0.082;
                break;
        }

        const filter = new ColorMatrixFilter();

        filter.matrix = [
            redWeight, greenWeight, blueWeight, 0, 0, // Red channel
            redWeight, greenWeight, blueWeight, 0, 0, // Green channel
            redWeight, greenWeight, blueWeight, 0, 0, // Blue channel
            0, 0, 0, 1, 0 // Alpha channel
        ];

        if(container.filters === undefined || container.filters === null) container.filters = [ filter ];
        else if(Array.isArray(container.filters)) container.filters = [ ...container.filters, filter ];
        else container.filters = [ container.filters, filter ];

        return container;
    }

    public isPlaceholder(): boolean
    {
        return false;
    }

    public get animationHasResetOnToggle(): boolean
    {
        return this._animationHasResetOnToggle;
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
