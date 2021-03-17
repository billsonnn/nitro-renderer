export class RoomSessionDimmerPresetsEventPresetItem
{
    private _id: number;
    private _type: number;
    private _color: number;
    private _light: number;

    constructor(k: number, _arg_2: number, _arg_3: number, _arg_4: number)
    {
        this._id = k;
        this._type = _arg_2;
        this._color = _arg_3;
        this._light = _arg_4;
    }

    public get id(): number
    {
        return this._id;
    }

    public get type(): number
    {
        return this._type;
    }

    public get color(): number
    {
        return this._color;
    }

    public get _Str_4272(): number
    {
        return this._light;
    }
}