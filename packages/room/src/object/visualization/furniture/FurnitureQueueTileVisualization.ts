import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';

export class FurnitureQueueTileVisualization extends FurnitureAnimatedVisualization
{
    private static ANIMATION_ID_ROLL: number = 3;
    private static ANIMATION_ID_ROLL_ONCE: number = 2;
    private static ANIMATION_ID_NORMAL: number = 1;
    private static ANIMATION_DURATION: number = 15;

    private _stateQueue: number[];
    private _animationCounter: number;

    constructor()
    {
        super();

        this._stateQueue = [];
        this._animationCounter = -1;
    }

    protected setAnimation(animationId: number): void
    {
        if(animationId === FurnitureQueueTileVisualization.ANIMATION_ID_ROLL_ONCE)
        {
            this._stateQueue = [];
            this._stateQueue.push(FurnitureQueueTileVisualization.ANIMATION_ID_NORMAL);

            this._animationCounter = FurnitureQueueTileVisualization.ANIMATION_DURATION;
        }

        return super.setAnimation(animationId);
    }

    protected updateAnimation(scale: number): number
    {
        if(this._animationCounter > 0) this._animationCounter--;

        if(!this._animationCounter)
        {
            if(this._stateQueue.length) super.setAnimation(this._stateQueue.shift());
        }

        return super.updateAnimation(scale);
    }

    protected usesAnimationResetting(): boolean
    {
        return true;
    }
}
