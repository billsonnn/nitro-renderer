export class ActionType
{
    private _id: number;
    private _value: number;
    private _prevents: string[];
    private _preventHeadTurn: boolean;
    private _isAnimated: boolean;

    constructor(data: any)
    {
        this._id = parseInt(data.id);
        this._value = parseInt(data.id);
        this._prevents = data.prevents || [];
        this._preventHeadTurn = data.preventHeadTurn || false;
        this._isAnimated = true;

        if((data.animated !== undefined) && (data.animated === false)) this._isAnimated = false;
    }

    public get id(): number
    {
        return this._id;
    }

    public get value(): number
    {
        return this._value;
    }

    public get prevents(): string[]
    {
        return this._prevents;
    }

    public get preventHeadTurn(): boolean
    {
        return this._preventHeadTurn;
    }

    public get isAnimated(): boolean
    {
        return this._isAnimated;
    }
}
