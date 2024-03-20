import { AnimationFrame } from './AnimationFrame';

export class AnimationStateData
{
    private _animationId: number;
    private _animationAfterTransitionId: number;
    private _animationOver: boolean;
    private _frameCounter: number;
    private _frames: AnimationFrame[];
    private _lastFramePlayed: boolean[];
    private _animationPlayed: boolean[];
    private _layerCount: number;

    constructor()
    {
        this._animationId = -1;
        this._animationAfterTransitionId = 0;
        this._animationOver = false;
        this._frameCounter = 0;
        this._frames = [];
        this._lastFramePlayed = [];
        this._animationPlayed = [];
        this._layerCount = 0;
    }

    public get animationOver(): boolean
    {
        return this._animationOver;
    }

    public set animationOver(k: boolean)
    {
        this._animationOver = k;
    }

    public get frameCounter(): number
    {
        return this._frameCounter;
    }

    public set frameCounter(k: number)
    {
        this._frameCounter = k;
    }

    public get animationId(): number
    {
        return this._animationId;
    }

    public set animationId(animationId: number)
    {
        if(animationId === this._animationId) return;

        this._animationId = animationId;

        this.resetAnimationFrames(false);
    }

    public get animationAfterTransitionId(): number
    {
        return this._animationAfterTransitionId;
    }

    public set animationAfterTransitionId(k: number)
    {
        this._animationAfterTransitionId = k;
    }

    public dispose(): void
    {
        this.recycleFrames();

        this._frames = null;
        this._lastFramePlayed = null;
        this._animationPlayed = null;
    }

    public setLayerCount(k: number): void
    {
        this._layerCount = k;

        this.resetAnimationFrames();
    }

    public resetAnimationFrames(k: boolean = true): void
    {
        if(k || (!this._frames))
        {
            this.recycleFrames();

            this._frames = [];
        }

        this._lastFramePlayed = [];
        this._animationPlayed = [];
        this._animationOver = false;
        this._frameCounter = 0;

        let layerId = 0;

        while(layerId < this._layerCount)
        {
            if(k || (this._frames.length <= layerId))
            {
                this._frames[layerId] = null;
            }
            else
            {
                const frame = this._frames[layerId];

                if(frame)
                {
                    frame.recycle();

                    this._frames[layerId] = AnimationFrame.allocate(frame.id, frame.x, frame.y, frame.repeats, 0, frame.isLastFrame);
                }
            }

            this._lastFramePlayed[layerId] = false;
            this._animationPlayed[layerId] = false;

            layerId++;
        }
    }

    private recycleFrames(): void
    {
        if(!this._frames || !this._frames.length) return;

        for(const frame of this._frames)
        {
            if(!frame) continue;

            frame.recycle();
        }
    }

    public getFrame(layerId: number): AnimationFrame
    {
        if((layerId < 0) || (layerId >= this._layerCount)) return null;

        return this._frames[layerId];
    }

    public setFrame(layerId: number, frame: AnimationFrame): void
    {
        if((layerId < 0) || (layerId >= this._layerCount)) return;

        const existingFrame = this._frames[layerId];

        if(existingFrame) existingFrame.recycle();

        this._frames[layerId] = frame;
    }

    public getAnimationPlayed(layerId: number): boolean
    {
        if((layerId < 0) || (layerId >= this._layerCount)) return true;

        return this._animationPlayed[layerId];
    }

    public setAnimationPlayed(layerId: number, flag: boolean): void
    {
        if((layerId < 0) || (layerId >= this._layerCount)) return;

        this._animationPlayed[layerId] = flag;
    }

    public getLastFramePlayed(layerId: number): boolean
    {
        if((layerId < 0) || (layerId >= this._layerCount)) return true;

        return this._lastFramePlayed[layerId];
    }

    public setLastFramePlayed(layerId: number, flag: boolean): void
    {
        if((layerId < 0) || (layerId >= this._layerCount)) return;

        this._lastFramePlayed[layerId] = flag;
    }
}