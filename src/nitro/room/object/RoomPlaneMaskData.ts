export class RoomPlaneMaskData
{
    private _leftSideLoc: number = 0;
    private _rightSideLoc: number = 0;
    private _leftSideLength: number = 0;
    private _rightSideLength: number = 0;

    constructor(k: number, _arg_2: number, _arg_3: number, _arg_4: number)
    {
        this._leftSideLoc       = k;
        this._rightSideLoc      = _arg_2;
        this._leftSideLength    = _arg_3;
        this._rightSideLength   = _arg_4;
    }

    public get _Str_5120(): number
    {
        return this._leftSideLoc;
    }

    public get _Str_4659(): number
    {
        return this._rightSideLoc;
    }

    public get _Str_9124(): number
    {
        return this._leftSideLength;
    }

    public get _Str_12156(): number
    {
        return this._rightSideLength;
    }
}