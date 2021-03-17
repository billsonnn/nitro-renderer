import { ObjectStateUpdateMessage } from './ObjectStateUpdateMessage';

export class ObjectAvatarPlayerValueUpdateMessage extends ObjectStateUpdateMessage
{
    private _value: number;

    constructor(value: number)
    {
        super();

        this._value = value;
    }

    public get value(): number
    {
        return this._value;
    }
}