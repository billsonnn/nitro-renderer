import { IFigureDataPart, IFigurePart } from '../../../../api';

export class FigurePart implements IFigurePart
{
    private _id: number;
    private _type: string;
    private _breed: number;
    private _index: number;
    private _colorLayerIndex: number;
    private _paletteMapId: number;

    constructor(data: IFigureDataPart)
    {
        if(!data) throw new Error('invalid_data');

        this._id = data.id;
        this._type = data.type;
        this._index = data.index;
        this._colorLayerIndex = data.colorindex;
        this._paletteMapId = -1;
        this._breed = -1;
    }

    public dispose(): void
    {

    }

    public get id(): number
    {
        return this._id;
    }

    public get type(): string
    {
        return this._type;
    }

    public get breed(): number
    {
        return this._breed;
    }

    public get index(): number
    {
        return this._index;
    }

    public get colorLayerIndex(): number
    {
        return this._colorLayerIndex;
    }

    public get paletteMap(): number
    {
        return this._paletteMapId;
    }
}
