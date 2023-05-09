export class RoomPlaneBitmapMask
{
    private _type: string;
    private _leftSideLoc: number;
    private _rightSideLoc: number;

    constructor(maskType: string, leftSideLoc: number, rightSideLoc: number)
    {
        this._type = maskType;
        this._leftSideLoc = leftSideLoc;
        this._rightSideLoc = rightSideLoc;
    }

    public get type(): string
    {
        return this._type;
    }

    public get leftSideLoc(): number
    {
        return this._leftSideLoc;
    }

    public get rightSideLoc(): number
    {
        return this._rightSideLoc;
    }
}
