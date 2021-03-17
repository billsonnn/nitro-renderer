export class PartDefinition
{
    private _setType: string;
    private _flippedSetType: string;
    private _removeSetType: string;
    private _appendToFigure: boolean;
    private _staticId: number;

    constructor(data: any)
    {
        if(!data) throw new Error('invalid_data');

        this._setType           = data.setType;
        this._flippedSetType    = data.flippedSetType || null;
        this._removeSetType     = data.removeSetType || null;
        this._appendToFigure    = false;
        this._staticId          = -1;
    }

    public _Str_2234(): boolean
    {
        return this._staticId >= 0;
    }

    public get _Str_1734(): number
    {
        return this._staticId;
    }

    public set _Str_1734(k: number)
    {
        this._staticId = k;
    }

    public get _Str_2174(): string
    {
        return this._setType;
    }

    public get _Str_1693(): string
    {
        return this._flippedSetType;
    }

    public set _Str_1693(type: string)
    {
        this._flippedSetType = type;
    }

    public get _Str_1209(): string
    {
        return this._removeSetType;
    }

    public get _Str_1583(): boolean
    {
        return this._appendToFigure;
    }

    public set _Str_1583(flag: boolean)
    {
        this._appendToFigure = flag;
    }
}