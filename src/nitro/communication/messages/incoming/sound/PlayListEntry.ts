export class PlayListEntry
{
    protected _id: number;
    protected _length: number;
    protected _name: string;
    protected _creator: string;
    private _startPlayHead: number = 0;

    constructor(id: number, length: number, name: string, creator: string)
    {
        this._id = id;
        this._length = length;
        this._name = name;
        this._creator = creator;
    }

    public get id(): number
    {
        return this._id;
    }

    public get length(): number
    {
        return this._length;
    }

    public get name(): string
    {
        return this._name;
    }

    public get creator(): string
    {
        return this._creator;
    }

    public get startPlayHeadPos(): number
    {
        return this._startPlayHead;
    }

    public set startPlayHeadPos(k: number)
    {
        this._startPlayHead = k;
    }
}
