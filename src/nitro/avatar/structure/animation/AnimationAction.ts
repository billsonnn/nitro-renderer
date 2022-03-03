import { Point } from '@pixi/math';
import { AnimationActionPart } from './AnimationActionPart';

export class AnimationAction
{
    public static DEFAULT_OFFSET: Point = new Point(0, 0);

    private _id: string;
    private _actionParts: Map<string, AnimationActionPart>;
    private _bodyPartOffsets: Map<number, Map<number, Map<string, Point>>>;
    private _frameCount: number;
    private _frameIndexes: number[];

    constructor(data: any)
    {
        this._id = data.id;
        this._actionParts = new Map();
        this._bodyPartOffsets = new Map();
        this._frameCount = 0;
        this._frameIndexes = [];

        if(data.parts && (data.parts.length > 0))
        {
            for(const part of data.parts)
            {
                if(!part) continue;

                const newPart = new AnimationActionPart(part);

                this._actionParts.set(part.setType, newPart);

                this._frameCount = Math.max(this._frameCount, newPart.frames.length);
            }
        }

        if(data.offsets && data.offsets.frames && (data.offsets.frames.length > 0))
        {
            for(const frame of data.offsets.frames)
            {
                if(!frame) continue;

                const frameId = frame.id;

                this._frameCount = Math.max(this._frameCount, frameId);

                const directions: Map<number, Map<string, Point>> = new Map();

                this._bodyPartOffsets.set(frameId, directions);

                if(frame.directions && (frame.directions.length > 0))
                {
                    for(const direction of frame.directions)
                    {
                        if(!direction) continue;

                        const directionId = direction.id;

                        const offsets: Map<string, Point> = new Map();

                        directions.set(directionId, offsets);

                        if(direction.bodyParts && (direction.bodyParts.length > 0))
                        {
                            for(const part of direction.bodyParts)
                            {
                                if(!part) continue;

                                const partId = part.id;

                                let dx = 0;
                                let dy = 0;

                                if(part.dx !== undefined) dx = part.dx;
                                if(part.dy !== undefined) dy = part.dy;

                                offsets.set(partId, new Point(dx, dy));
                            }
                        }
                    }
                }

                this._frameIndexes.push(frameId);

                if(frame.repeats !== undefined)
                {
                    let repeats = frame.repeats || 0;

                    if(repeats > 1) while(--repeats > 0) this._frameIndexes.push(frameId);
                }
            }
        }
    }

    public getPart(type: string): AnimationActionPart
    {
        if(!type) return null;

        const existing = this._actionParts.get(type);

        if(!existing) return null;

        return existing;
    }

    public getFrameBodyPartOffset(frameId: number, frameCount: number, partId: string): Point
    {
        const frameIndex = (frameCount % this._frameIndexes.length);
        const frameNumber = this._frameIndexes[frameIndex];
        const offsets = this._bodyPartOffsets.get(frameNumber);

        if(!offsets) return AnimationAction.DEFAULT_OFFSET;

        const frameOffset = offsets.get(frameId);

        if(!frameOffset) return AnimationAction.DEFAULT_OFFSET;

        const offset = frameOffset.get(partId);

        if(!offset) return AnimationAction.DEFAULT_OFFSET;

        return offset;
    }

    public get id(): string
    {
        return this._id;
    }

    public get parts(): Map<string, AnimationActionPart>
    {
        return this._actionParts;
    }

    public get frameCount(): number
    {
        return this._frameCount;
    }
}
