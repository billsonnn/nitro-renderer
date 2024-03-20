import { AnimationFrameData } from './AnimationFrameData';
import { AnimationFrameDirectionalData } from './AnimationFrameDirectionalData';
import { DirectionalOffsetData } from './DirectionalOffsetData';

export class AnimationFrameSequenceData
{
    private _frames: AnimationFrameData[];
    private _frameIndexes: number[];
    private _frameRepeats: number[];
    private _isRandom: boolean;
    private _loopCount: number;

    constructor(loopCount: number, isRandom: boolean)
    {
        this._frames = [];
        this._frameIndexes = [];
        this._frameRepeats = [];
        this._isRandom = isRandom;
        this._loopCount = (loopCount < 1) ? 1 : loopCount;
    }

    public get isRandom(): boolean
    {
        return this._isRandom;
    }

    public get frameCount(): number
    {
        return (this._frameIndexes.length * this._loopCount);
    }

    public dispose(): void
    {
        this._frames = [];
    }

    public initialize(): void
    {
        let frameIndex: number = (this._frameIndexes.length - 1);
        let realIndex = -1;
        let nextIndex = 1;

        while(frameIndex >= 0)
        {
            if(this._frameIndexes[frameIndex] === realIndex)
            {
                nextIndex++;
            }
            else
            {
                realIndex = this._frameIndexes[frameIndex];
                nextIndex = 1;
            }

            this._frameRepeats[frameIndex] = nextIndex;

            frameIndex--;
        }
    }

    public addFrame(id: number, x: number, y: number, randomX: number, randomY: number, directionalOffset: DirectionalOffsetData): void
    {
        let repeats = 1;

        if(this._frames.length > 0)
        {
            const frame = this._frames[(this._frames.length - 1)];

            if((((((((frame.id === id) && (!(frame.hasDirectionalOffsets()))) && (frame.x === x)) && (frame.y === y)) && (frame.randomX === randomX)) && (randomX === 0)) && (frame.randomY === randomY)) && (randomY === 0))
            {
                repeats += frame.repeats;

                this._frames.pop();
            }
        }

        const frame = (directionalOffset) ? new AnimationFrameDirectionalData(id, x, y, randomX, randomY, directionalOffset, repeats) : new AnimationFrameData(id, x, y, randomX, randomY, repeats);

        this._frames.push(frame);
        this._frameIndexes.push((this._frames.length - 1));
        this._frameRepeats.push(1);
    }

    public getFrame(frameCount: number): AnimationFrameData
    {
        if((!this._frames.length || (frameCount < 0)) || (frameCount >= this.frameCount)) return null;

        return this._frames[this._frameIndexes[(frameCount % this._frameIndexes.length)]];
    }

    public getFrameIndex(frameCount: number): number
    {
        if(((frameCount < 0) || (frameCount >= this.frameCount))) return -1;

        if(this._isRandom)
        {
            frameCount = Math.round((Math.random() * this._frameIndexes.length));

            if(frameCount === this._frameIndexes.length) frameCount--;
        }

        return frameCount;
    }

    public getRepeats(frameCount: number): number
    {
        if(((frameCount < 0) || (frameCount >= this.frameCount))) return 0;

        return this._frameRepeats[(frameCount % this._frameRepeats.length)];
    }
}