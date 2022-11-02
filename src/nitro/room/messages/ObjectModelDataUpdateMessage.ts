import { RoomObjectUpdateMessage } from '../../../room';

export class ObjectModelDataUpdateMessage extends RoomObjectUpdateMessage
{
    private _numberKey: string;
    private _numberValue: number;

    constructor(numberKey: string, numberValue: number)
    {
        super(null, null);

        this._numberKey = numberKey;
        this._numberValue = numberValue;
    }

    public get numberKey(): string
    {
        return this._numberKey;
    }

    public get numberValue(): number
    {
        return this._numberValue;
    }
}
