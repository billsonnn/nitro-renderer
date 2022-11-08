export class TraxChannelItem
{
    private _id: number;
    private _length: number;

    constructor(id: number, length: number)
    {
        this._id = id;
        this._length = length;
    }

    public get id(): number
    {
        return this._id;
    }

    public get length(): number
    {
        return this._length;
    }
}
