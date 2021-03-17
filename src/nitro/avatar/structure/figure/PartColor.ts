import { IPartColor } from './IPartColor';

export class PartColor implements IPartColor
{
    private _id: number;
    private _index: number;
    private _clubLevel: number;
    private _isSelectable: boolean;
    private _rgb: number;

    constructor(data: any)
    {
        if(!data) throw new Error('invalid_data');

        this._id                = parseInt(data['$'].id);
        this._index             = parseInt(data['$'].index);
        this._clubLevel         = parseInt(data['$'].club);
        this._isSelectable      = parseInt(data['$'].selectable) === 1;
        this._rgb               = parseInt('0x' + data['_'], 16);
    }

    public get id(): number
    {
        return this._id;
    }

    public get index(): number
    {
        return this._index;
    }

    public get clubLevel(): number
    {
        return this._clubLevel;
    }

    public get isSelectable(): boolean
    {
        return this._isSelectable;
    }

    public get _Str_915(): number
    {
        return this._rgb;
    }
}