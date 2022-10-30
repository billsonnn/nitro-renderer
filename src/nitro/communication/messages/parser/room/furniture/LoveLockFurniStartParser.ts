import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class LoveLockFurniStartParser implements IMessageParser
{
    private _furniId: number;
    private _start: boolean;

    public get furniId(): number
    {
        return this._furniId;
    }

    public get start(): boolean
    {
        return this._start;
    }

    public flush(): boolean
    {
        this._furniId = -1;
        this._start = false;
        return true;
    }

    public parse(packet: IMessageDataWrapper): boolean
    {
        this._furniId = packet.readInt();
        this._start = packet.readBoolean();
        return true;
    }
}
