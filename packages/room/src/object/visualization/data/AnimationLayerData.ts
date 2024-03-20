import { AnimationFrame } from './AnimationFrame';
import { AnimationFrameSequenceData } from './AnimationFrameSequenceData';

export class AnimationLayerData
{
    private _frameSequences: AnimationFrameSequenceData[];
    private _frameCount: number;
    private _loopCount: number;
    private _frameRepeat: number;
    private _isRandom: boolean;

    constructor(loopCount: number, frameRepeat: number, isRandom: boolean)
    {
        this._frameSequences = [];
        this._frameCount = -1;
        this._loopCount = (loopCount < 0) ? 0 : loopCount;
        this._frameRepeat = (frameRepeat < 1) ? 1 : frameRepeat;
        this._isRandom = isRandom;
    }

    public get frameCount(): number
    {
        if(this._frameCount < 0) this.calculateLength();

        return this._frameCount;
    }

    public dispose(): void
    {
        if(!this._frameSequences || !this._frameSequences.length) return;

        for(const sequence of this._frameSequences)
        {
            if(!sequence) continue;

            sequence.dispose();
        }

        this._frameSequences = [];
    }

    public addFrameSequence(loopCount: number, isRandom: boolean): AnimationFrameSequenceData
    {
        const sequence = new AnimationFrameSequenceData(loopCount, isRandom);

        this._frameSequences.push(sequence);

        return sequence;
    }

    public calculateLength(): void
    {
        this._frameCount = 0;

        for(const sequence of this._frameSequences)
        {
            if(!sequence) continue;

            this._frameCount += sequence.frameCount;
        }
    }

    public getFrame(direction: number, frameCount: number): AnimationFrame
    {
        if(this._frameCount < 1) return null;

        frameCount = (frameCount / this._frameRepeat);

        if(!this._isRandom)
        {
            const count = Math.floor(frameCount / this._frameCount);
            frameCount = Math.floor(frameCount % this._frameCount);

            let doesRepeat = false;
            let sequence: AnimationFrameSequenceData = null;

            if(((this._loopCount > 0) && (count >= this._loopCount)) || ((this._loopCount <= 0) && (this._frameCount === 1)))
            {
                frameCount = (this._frameCount - 1);
                doesRepeat = true;
            }

            let sequenceFrameCount = 0;
            let sequenceId = 0;

            while(sequenceId < this._frameSequences.length)
            {
                sequence = this._frameSequences[sequenceId];

                if(sequence)
                {
                    if(frameCount < (sequenceFrameCount + sequence.frameCount)) break;

                    sequenceFrameCount += sequence.frameCount;
                }

                sequenceId++;
            }

            return this.getFrameFromSpecificSequence(direction, sequence, sequenceId, (frameCount - sequenceFrameCount), doesRepeat);
        }

        const sequenceId = Math.trunc(this._frameSequences.length * Math.random());
        const sequence = this._frameSequences[sequenceId];

        if(sequence.frameCount < 1) return null;

        return this.getFrameFromSpecificSequence(direction, sequence, sequenceId, 0, false);
    }

    public getFrameFromSequence(direction: number, sequenceId: number, offset: number, frameCount: number): AnimationFrame
    {
        if((sequenceId < 0) || (sequenceId >= this._frameSequences.length)) return null;

        const sequence = this._frameSequences[sequenceId];

        if(!sequence) return null;

        if(offset >= sequence.frameCount) return this.getFrame(direction, frameCount);

        return this.getFrameFromSpecificSequence(direction, sequence, sequenceId, offset, false);
    }

    private getFrameFromSpecificSequence(direction: number, sequence: AnimationFrameSequenceData, sequenceId: number, offset: number, doesRepeat: boolean): AnimationFrame
    {
        if(!sequence) return null;

        const frameIndex = sequence.getFrameIndex(offset);
        const frame = sequence.getFrame(frameIndex);

        if(!frame) return null;

        let x = frame.getX(direction);
        let y = frame.getY(direction);
        const randomX = frame.randomX;
        const randomY = frame.randomY;
        let repeats = frame.repeats;
        let isLastFrame = false;

        if(randomX) x = Math.trunc(x + randomX * Math.random());
        if(randomY) y = Math.trunc(y + randomY * Math.random());

        if(repeats > 1) repeats = sequence.getRepeats(frameIndex);

        let frameRepeats = (this._frameRepeat * repeats);

        if(doesRepeat) frameRepeats = AnimationFrame.FRAME_REPEAT_FOREVER;

        if(!this._isRandom && !sequence.isRandom)
        {
            if((sequenceId === (this._frameSequences.length - 1)) && (offset === (sequence.frameCount - 1))) isLastFrame = true;
        }

        return AnimationFrame.allocate(frame.id, x, y, repeats, frameRepeats, isLastFrame, sequenceId, offset);
    }
}