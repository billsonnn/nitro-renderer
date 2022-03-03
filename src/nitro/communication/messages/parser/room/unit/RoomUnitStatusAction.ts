export class RoomUnitStatusAction
{
    private _action: string;
    private _value: string;

    constructor(action: string, value: string)
    {
        this._action = action;
        this._value = value;
    }

    public get action(): string
    {
        return this._action;
    }

    public get value(): string
    {
        return this._value;
    }
}