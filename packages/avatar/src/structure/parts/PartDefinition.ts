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

        this._setType = data.setType;
        this._flippedSetType = data.flippedSetType || null;
        this._removeSetType = data.removeSetType || null;
        this._appendToFigure = false;
        this._staticId = -1;
    }

    public hasStaticId(): boolean
    {
        return this._staticId >= 0;
    }

    public get staticId(): number
    {
        return this._staticId;
    }

    public set staticId(k: number)
    {
        this._staticId = k;
    }

    public get setType(): string
    {
        return this._setType;
    }

    public get flippedSetType(): string
    {
        return this._flippedSetType;
    }

    public set flippedSetType(type: string)
    {
        this._flippedSetType = type;
    }

    public get removeSetType(): string
    {
        return this._removeSetType;
    }

    public get appendToFigure(): boolean
    {
        return this._appendToFigure;
    }

    public set appendToFigure(flag: boolean)
    {
        this._appendToFigure = flag;
    }
}
