export class PetColorResult
{
    private static _Str_12950: string[] = ['Null', 'Black', 'White', 'Grey', 'Red', 'Orange', 'Pink', 'Green', 'Lime', 'Blue', 'Light-Blue', 'Dark-Blue', 'Yellow', 'Brown', 'Dark-Brown', 'Beige', 'Cyan', 'Purple', 'Gold'];

    private _breed: number;
    private _tag: string;
    private _id: string;
    private _primaryColor: number;
    private _secondaryColor: number;
    private _isMaster: boolean;
    private _layerTags: string[];

    constructor(k: number, _arg_2: number, _arg_3: number, _arg_4: number, _arg_5: string, _arg_6: boolean, _arg_7: string[])
    {
        this._layerTags         = [];
        this._primaryColor      = (k & 0xFFFFFF);
        this._secondaryColor    = (_arg_2 & 0xFFFFFF);
        this._breed             = _arg_3;
        this._tag               = (((_arg_4 > -1) && (_arg_4 < PetColorResult._Str_12950.length)) ? PetColorResult._Str_12950[_arg_4] : '');
        this._id                = _arg_5;
        this._isMaster          = _arg_6;
        this._layerTags         = _arg_7;
    }

    public get _Str_5845(): number
    {
        return this._primaryColor;
    }

    public get _Str_6659(): number
    {
        return this._secondaryColor;
    }

    public get breed(): number
    {
        return this._breed;
    }

    public get tag(): string
    {
        return this._tag;
    }

    public get id(): string
    {
        return this._id;
    }

    public get _Str_11964(): boolean
    {
        return this._isMaster;
    }

    public get _Str_24801(): string[]
    {
        return this._layerTags;
    }
}