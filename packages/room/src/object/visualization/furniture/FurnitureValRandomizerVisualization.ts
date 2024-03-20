import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';

export class FurnitureValRandomizerVisualization extends FurnitureAnimatedVisualization
{
    private static ANIMATION_ID_OFFSET_SLOW1: number = 20;
    private static ANIMATION_ID_OFFSET_SLOW2: number = 10;
    private static ANIMATION_ID_START_ROLL: number = 31;
    private static ANIMATION_ID_ROLL: number = 32;
    private static ANIMATION_ID_OFF: number = 30;

    private _stateQueue: number[];
    private _running: boolean;

    constructor()
    {
        super();

        this._stateQueue = [];
        this._running = false;

        super.setAnimation(FurnitureValRandomizerVisualization.ANIMATION_ID_OFF);
    }

    protected setAnimation(animationId: number): void
    {
        if(animationId === 0)
        {
            if(!this._running)
            {
                this._running = true;
                this._stateQueue = [];

                this._stateQueue.push(FurnitureValRandomizerVisualization.ANIMATION_ID_START_ROLL);
                this._stateQueue.push(FurnitureValRandomizerVisualization.ANIMATION_ID_ROLL);

                return;
            }
        }

        if((animationId > 0) && (animationId <= FurnitureValRandomizerVisualization.ANIMATION_ID_OFFSET_SLOW2))
        {
            if(this._running)
            {
                this._running = false;
                this._stateQueue = [];

                if(this.direction === 2)
                {
                    this._stateQueue.push(FurnitureValRandomizerVisualization.ANIMATION_ID_OFFSET_SLOW1 + 5);
                    this._stateQueue.push(FurnitureValRandomizerVisualization.ANIMATION_ID_OFFSET_SLOW2 + 5);
                }
                else
                {
                    this._stateQueue.push(FurnitureValRandomizerVisualization.ANIMATION_ID_OFFSET_SLOW1 + animationId);
                    this._stateQueue.push(FurnitureValRandomizerVisualization.ANIMATION_ID_OFFSET_SLOW2 + animationId);
                }

                this._stateQueue.push(FurnitureValRandomizerVisualization.ANIMATION_ID_OFF);

                return;
            }

            super.setAnimation(FurnitureValRandomizerVisualization.ANIMATION_ID_OFF);
        }
    }

    protected updateAnimation(scale: number): number
    {
        if(this.getLastFramePlayed(11))
        {
            if(this._stateQueue.length) super.setAnimation(this._stateQueue.shift());
        }

        return super.updateAnimation(scale);
    }
}
