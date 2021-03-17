export class Byte
{
    private _value: number;

    constructor(value: number)
    {
        this._value = value;
    }

    public get value(): number
    {
        return this._value;
    }
}