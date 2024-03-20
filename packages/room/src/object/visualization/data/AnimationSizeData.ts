import { IAssetVisualAnimation } from '@nitrots/api';
import { AnimationData } from './AnimationData';
import { AnimationFrame } from './AnimationFrame';
import { SizeData } from './SizeData';

export class AnimationSizeData extends SizeData
{
    private _animations: Map<number, AnimationData>;
    private _animationIds: number[];

    constructor(layerCount: number, angle: number)
    {
        super(layerCount, angle);

        this._animations = new Map();
        this._animationIds = [];
    }

    public dispose(): void
    {
        super.dispose();

        for(const animation of this._animations.values())
        {
            if(!animation) continue;

            animation.dispose();
        }

        this._animations.clear();

        this._animationIds = [];
    }

    public defineAnimations(animations: { [index: string]: IAssetVisualAnimation }): boolean
    {
        if(!animations) return true;

        for(const key in animations)
        {
            const animation = animations[key];

            if(!animation) return false;

            let animationId = parseInt(key.split('_')[0]);
            let isTransition = false;

            const transitionTo = animation.transitionTo;
            const transitionFrom = animation.transitionFrom;

            if(transitionTo !== undefined)
            {
                animationId = AnimationData.getTransitionToAnimationId(transitionTo);
                isTransition = true;
            }

            if(transitionFrom !== undefined)
            {
                animationId = AnimationData.getTransitionFromAnimationId(transitionFrom);
                isTransition = true;
            }

            const animationData = this.createAnimationData();

            if(!animationData.initialize(animation))
            {
                animationData.dispose();

                return false;
            }

            const immediateChangeFrom = animation.immediateChangeFrom;

            if(immediateChangeFrom !== undefined)
            {
                const changes = immediateChangeFrom.split(',');
                const changeIds = [];

                for(const change of changes)
                {
                    const changeId = parseInt(change);

                    if(changeIds.indexOf(changeId) === -1) changeIds.push(changeId);
                }

                animationData.setImmediateChanges(changeIds);
            }

            this._animations.set(animationId, animationData);

            if(!isTransition) this._animationIds.push(animationId);
        }

        return true;
    }

    protected createAnimationData(): AnimationData
    {
        return new AnimationData();
    }

    public hasAnimation(animationId: number): boolean
    {
        if(!this._animations.get(animationId)) return false;

        return true;
    }

    public getAnimationCount(): number
    {
        return this._animationIds.length || 0;
    }

    public getAnimationId(animationId: number): number
    {
        const totalAnimations = this.getAnimationCount();

        if((animationId < 0) || (totalAnimations <= 0)) return 0;

        return this._animationIds[(animationId % totalAnimations)];
    }

    public isImmediateChange(animationId: number, _arg_2: number): boolean
    {
        const animation = this._animations.get(animationId);

        if(!animation) return false;

        return animation.isImmediateChange(_arg_2);
    }

    public getStartFrame(animationId: number, direction: number): number
    {
        const animation = this._animations.get(animationId);

        if(!animation) return 0;

        return animation.getStartFrame(direction);
    }

    public getFrame(animationId: number, direction: number, layerId: number, frameCount: number): AnimationFrame
    {
        const animation = this._animations.get(animationId);

        if(!animation) return null;

        return animation.getFrame(direction, layerId, frameCount);
    }

    public getFrameFromSequence(animationId: number, direction: number, layerId: number, sequenceId: number, offset: number, frameCount: number): AnimationFrame
    {
        const animation = this._animations.get(animationId);

        if(!animation) return null;

        return animation.getFrameFromSequence(direction, layerId, sequenceId, offset, frameCount);
    }
}
