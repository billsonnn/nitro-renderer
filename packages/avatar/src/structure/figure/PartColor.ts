import { IFigureDataColor, IPartColor } from '@nitrots/api';

export class PartColor implements IPartColor
{
    private _id: number;
    private _index: number;
    private _clubLevel: number;
    private _isSelectable: boolean;
    private _rgb: number;

    constructor(data: IFigureDataColor)
    {
        if(!data) throw new Error('invalid_data');

        this._id = data.id;
        this._index = data.index;
        this._clubLevel = (data.club || 0);
        this._isSelectable = data.selectable;
        this._rgb = parseInt('0x' + data.hexCode, 16);
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

    public get rgb(): number
    {
        return this._rgb;
    }
}
