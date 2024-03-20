import { AnimationFrameData } from './AnimationFrameData';
import { DirectionalOffsetData } from './DirectionalOffsetData';

export class AnimationFrameDirectionalData extends AnimationFrameData
{
    private _directionalOffsets: DirectionalOffsetData;

    constructor(id: number, x: number, y: number, randomX: number, randomY: number, offsets: DirectionalOffsetData, repeats: number)
    {
        super(id, x, y, randomX, randomY, repeats);

        this._directionalOffsets = offsets;
    }

    public hasDirectionalOffsets(): boolean
    {
        return this._directionalOffsets !== null;
    }

    public getX(direction: number): number
    {
        if(!this._directionalOffsets) return super.getX(direction);

        return this._directionalOffsets.getXOffset(direction, super.getX(direction));
    }

    public getY(direction: number): number
    {
        if(!this._directionalOffsets) return super.getY(direction);

        return this._directionalOffsets.getYOffset(direction, super.getY(direction));
    }
}