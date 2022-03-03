export class RoomPlaneBitmapMask
{
    private _type: string;
    private _leftSideLoc: number;
    private _rightSideLoc: number;

    constructor(k: string, _arg_2: number, _arg_3: number)
    {
        this._type = k;
        this._leftSideLoc = _arg_2;
        this._rightSideLoc = _arg_3;
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
