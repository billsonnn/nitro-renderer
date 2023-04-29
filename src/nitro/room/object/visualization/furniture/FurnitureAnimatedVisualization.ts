import { IObjectVisualizationData, RoomObjectVariable, RoomObjectVisualizationType } from '../../../../../api';
import { AnimationData, AnimationFrame, AnimationStateData } from '../data';
import { FurnitureAnimatedVisualizationData } from './FurnitureAnimatedVisualizationData';
import { FurnitureVisualization } from './FurnitureVisualization';

export class FurnitureAnimatedVisualization extends FurnitureVisualization
{
    public static TYPE: string = RoomObjectVisualizationType.FURNITURE_ANIMATED;
    public static DEFAULT_ANIMATION_ID: number = 0;

    protected _state: number;
    protected _frameIncrease: number;
    private _animationData: AnimationStateData;
    private _animationScale: number;
    private _animationChangeTime: number;
    private _animatedLayerCount: number;
    private _directionChanged: boolean;

    constructor()
    {
        super();

        this._state = -1;
        this._frameIncrease = 1;
        this._animationData = new AnimationStateData();
        this._animationScale = 0;
        this._animationChangeTime = 0;
        this._animatedLayerCount = 0;
        this._directionChanged = false;
    }

    public initialize(data: IObjectVisualizationData): boolean
    {
        if(!(data instanceof FurnitureAnimatedVisualizationData)) return false;

        return super.initialize(data);
    }

    public dispose(): void
    {
        super.dispose();

        if(this._animationData)
        {
            this._animationData.dispose();

            this._animationData = null;
        }
    }

    protected get animatedLayerCount(): number
    {
        return this._animatedLayerCount;
    }

    public get animationId(): number
    {
        return this._animationData.animationId;
    }

    protected getAnimationId(animationData: AnimationStateData): number
    {
        if((this.animationId !== FurnitureAnimatedVisualization.DEFAULT_ANIMATION_ID) && this.data.hasAnimation(this._animationScale, this.animationId)) return this.animationId;

        return FurnitureAnimatedVisualization.DEFAULT_ANIMATION_ID;
    }

    protected updateObject(scale: number, direction: number): boolean
    {
        if(super.updateObject(scale, direction))
        {
            const state = this.object.getState(0);

            if(state !== this._state)
            {
                this.setAnimation(state);

                this._state = state;

                this._animationChangeTime = (this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_STATE_UPDATE_TIME) || 0);
            }

            return true;
        }

        return false;
    }

    protected updateModel(scale: number): boolean
    {
        if(super.updateModel(scale))
        {
            if(this.usesAnimationResetting())
            {
                const updateTime = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_STATE_UPDATE_TIME);

                if(updateTime > this._animationChangeTime)
                {
                    this._animationChangeTime = updateTime;

                    this.setAnimation(this._state);
                }
            }

            const state = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_AUTOMATIC_STATE_INDEX);

            if(!isNaN(state))
            {
                const animationId = this.data.getAnimationId(this._animationScale, state);

                this.setAnimation(animationId);
            }

            return true;
        }

        return false;
    }

    private isPlayingTransition(animationData: AnimationStateData, animationId: number): boolean
    {
        if(!AnimationData.isTransitionFromAnimation(animationData.animationId) && !AnimationData.isTransitionToAnimation(animationData.animationId)) return false;

        if(animationId !== animationData.animationAfterTransitionId) return false;

        if(animationData.animationOver) return false;

        return true;
    }

    private getCurrentState(animationData: AnimationStateData): number
    {
        const animationId = animationData.animationId;

        if(!AnimationData.isTransitionFromAnimation(animationId) && !AnimationData.isTransitionToAnimation(animationId)) return animationId;

        return animationData.animationAfterTransitionId;
    }

    protected setAnimation(animationId: number): void
    {
        if(!this.data) return;

        this.setSubAnimation(this._animationData, animationId, (this._state >= 0));
    }

    protected setSubAnimation(animationData: AnimationStateData, animationId: number, _arg_3: boolean = true): boolean
    {
        const currentAnimation = animationData.animationId;

        if(_arg_3)
        {
            if(this.isPlayingTransition(animationData, animationId)) return false;

            const state = this.getCurrentState(animationData);

            if(animationId !== state)
            {
                if(!this.data.isImmediateChange(this._animationScale, animationId, state))
                {
                    let transition = AnimationData.getTransitionFromAnimationId(state);

                    if(this.data.hasAnimation(this._animationScale, transition))
                    {
                        animationData.animationAfterTransitionId = animationId;
                        animationId = transition;
                    }
                    else
                    {
                        transition = AnimationData.getTransitionToAnimationId(animationId);

                        if(this.data.hasAnimation(this._animationScale, transition))
                        {
                            animationData.animationAfterTransitionId = animationId;
                            animationId = transition;
                        }
                    }
                }
            }
            else
            {
                if(AnimationData.isTransitionFromAnimation(animationData.animationId))
                {
                    const transition = AnimationData.getTransitionToAnimationId(animationId);

                    if(this.data.hasAnimation(this._animationScale, transition))
                    {
                        animationData.animationAfterTransitionId = animationId;
                        animationId = transition;
                    }
                }

                else if(!AnimationData.isTransitionToAnimation(animationData.animationId))
                {
                    if(this.usesAnimationResetting())
                    {
                        const transition = AnimationData.getTransitionFromAnimationId(state);

                        if(this.data.hasAnimation(this._animationScale, transition))
                        {
                            animationData.animationAfterTransitionId = animationId;
                            animationId = transition;
                        }
                        else
                        {
                            const transition = AnimationData.getTransitionToAnimationId(animationId);

                            if(this.data.hasAnimation(this._animationScale, transition))
                            {
                                animationData.animationAfterTransitionId = animationId;
                                animationId = transition;
                            }
                        }
                    }
                }
            }
        }

        if(currentAnimation !== animationId)
        {
            animationData.animationId = animationId;

            return true;
        }

        return false;
    }

    protected getLastFramePlayed(layerId: number): boolean
    {
        return this._animationData.getLastFramePlayed(layerId);
    }

    protected resetAllAnimationFrames(): void
    {
        if(!this._animationData) return;

        this._animationData.setLayerCount(this._animatedLayerCount);
    }

    protected updateAnimation(scale: number): number
    {
        if(!this.data) return 0;

        if(scale !== this._animationScale)
        {
            this._animationScale = scale;
            this._animatedLayerCount = this.data.getLayerCount(scale);

            this.resetAllAnimationFrames();
        }

        const update = this.updateAnimations(scale);

        this._directionChanged = false;

        return update;
    }

    protected updateAnimations(scale: number): number
    {
        if(this._animationData.animationOver && !this._directionChanged) return 0;

        const update = this.updateFramesForAnimation(this._animationData, scale);

        if(this._animationData.animationOver)
        {
            if((AnimationData.isTransitionFromAnimation(this._animationData.animationId)) || (AnimationData.isTransitionToAnimation(this._animationData.animationId)))
            {
                this.setAnimation(this._animationData.animationAfterTransitionId);
                this._animationData.animationOver = false;
            }
        }

        return update;
    }

    protected updateFramesForAnimation(animationData: AnimationStateData, scale: number): number
    {
        if(animationData.animationOver && !this._directionChanged) return 0;

        const animationId = this.getAnimationId(animationData);
        let frameCount = animationData.frameCounter;

        if(!frameCount) frameCount = this.data.getStartFrame(scale, animationId, this._direction);

        frameCount += this.frameIncrease;
        animationData.frameCounter = frameCount;
        animationData.animationOver = true;

        let animationPlayed = false;
        let layerId = (this._animatedLayerCount - 1);
        let update = 0;
        let layerUpdate = (1 << (this._animatedLayerCount - 1));

        while(layerId >= 0)
        {
            let sequenceId = 0;

            animationPlayed = animationData.getAnimationPlayed(layerId);

            if(!animationPlayed || this._directionChanged)
            {
                let lastFramePlayed = animationData.getLastFramePlayed(layerId);
                let frame = animationData.getFrame(layerId);

                if(frame)
                {
                    if(frame.isLastFrame && (frame.remainingFrameRepeats <= this.frameIncrease))
                    {
                        lastFramePlayed = true;
                    }
                }

                if((this._directionChanged || !frame) || ((frame.remainingFrameRepeats >= 0) && ((frame.remainingFrameRepeats = (frame.remainingFrameRepeats - this.frameIncrease)) <= 0)))
                {
                    sequenceId = AnimationFrame.SEQUENCE_NOT_DEFINED;

                    if(frame) sequenceId = frame.activeSequence;

                    if(sequenceId === AnimationFrame.SEQUENCE_NOT_DEFINED)
                    {
                        frame = this.data.getFrame(scale, animationId, this._direction, layerId, frameCount);
                    }
                    else
                    {
                        frame = this.data.getFrameFromSequence(scale, animationId, this._direction, layerId, sequenceId, (frame.activeSequenceOffset + frame.repeats), frameCount);
                    }

                    animationData.setFrame(layerId, frame);

                    update = (update | layerUpdate);
                }

                if(!frame || (frame.remainingFrameRepeats == AnimationFrame.FRAME_REPEAT_FOREVER))
                {
                    lastFramePlayed = true;
                    animationPlayed = true;
                }
                else
                {
                    animationData.animationOver = false;
                }

                animationData.setLastFramePlayed(layerId, lastFramePlayed);
                animationData.setAnimationPlayed(layerId, animationPlayed);
            }

            layerUpdate = (layerUpdate >> 1);

            layerId--;
        }

        return update;
    }

    protected getFrameNumber(scale: number, layerId: number): number
    {
        const currentFrame = this._animationData.getFrame(layerId);

        if(!currentFrame) return super.getFrameNumber(scale, layerId);

        return currentFrame.id;
    }

    protected getLayerXOffset(scale: number, direction: number, layerId: number): number
    {
        const offset = super.getLayerXOffset(scale, direction, layerId);

        const currentFrame = this._animationData.getFrame(layerId);

        if(!currentFrame) return offset;

        return (offset + currentFrame.x);
    }

    protected getLayerYOffset(scale: number, direction: number, layerId: number): number
    {
        const offset = super.getLayerYOffset(scale, direction, layerId);

        const currentFrame = this._animationData.getFrame(layerId);

        if(!currentFrame) return offset;

        return (offset + currentFrame.y);
    }

    protected usesAnimationResetting(): boolean
    {
        return false;
    }

    protected setDirection(direction: number): void
    {
        if(this._direction === direction) return;

        super.setDirection(direction);

        this._directionChanged = true;
    }

    protected get frameIncrease(): number
    {
        return this._frameIncrease;
    }

    protected get data(): FurnitureAnimatedVisualizationData
    {
        return this._data as FurnitureAnimatedVisualizationData;
    }
}
