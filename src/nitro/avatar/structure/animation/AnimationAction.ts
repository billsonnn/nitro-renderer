import { Point } from 'pixi.js';
import { AnimationActionPart } from './AnimationActionPart';

export class AnimationAction
{
    public static _Str_1934: Point = new Point(0, 0);

    private _id: string;
    private _actionParts: Map<string, AnimationActionPart>;
    private _bodyPartOffsets: Map<number, Map<number, Map<string, Point>>>;
    private _frameCount: number;
    private _frameIndexes: number[];

    constructor(data: any)
    {
        this._id                = data.id;
        this._actionParts       = new Map();
        this._bodyPartOffsets   = new Map();
        this._frameCount        = 0;
        this._frameIndexes      = [];

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

    public _Str_989(type: string): AnimationActionPart
    {
        if(!type) return null;

        const existing = this._actionParts.get(type);

        if(!existing) return null;

        return existing;
    }

    public _Str_1888(frameId: number, frameCount: number, partId: string): Point
    {
        const frameIndex    = (frameCount % this._frameIndexes.length);
        const frameNumber   = this._frameIndexes[frameIndex];
        const offsets       = this._bodyPartOffsets.get(frameNumber);

        if(!offsets) return AnimationAction._Str_1934;

        const frameOffset = offsets.get(frameId);

        if(!frameOffset) return AnimationAction._Str_1934;

        const offset = frameOffset.get(partId);

        if(!offset) return AnimationAction._Str_1934;

        return offset;
    }

    public get id(): string
    {
        return this._id;
    }

    public get _Str_806(): Map<string, AnimationActionPart>
    {
        return this._actionParts;
    }

    public get _Str_2185(): number
    {
        return this._frameCount;
    }
}