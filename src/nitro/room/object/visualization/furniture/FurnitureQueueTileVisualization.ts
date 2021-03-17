import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';

export class FurnitureQueueTileVisualization extends FurnitureAnimatedVisualization
{
    private static _Str_4186: number    = 3;
    private static _Str_18395: number   = 2;
    private static _Str_15915: number   = 1;
    private static _Str_16054: number   = 15;

    private _stateQueue: number[];
    private _animationCounter: number;

    constructor()
    {
        super();

        this._stateQueue        = [];
        this._animationCounter  = -1;
    }

    protected setAnimation(animationId: number): void
    {
        if(animationId === FurnitureQueueTileVisualization._Str_18395)
        {
            this._stateQueue    = [];
            this._stateQueue.push(FurnitureQueueTileVisualization._Str_15915);

            this._animationCounter = FurnitureQueueTileVisualization._Str_16054;
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