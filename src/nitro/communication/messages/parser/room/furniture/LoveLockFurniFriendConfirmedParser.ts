import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class LoveLockFurniFriendConfirmedParser implements IMessageParser
{
    private _furniId: number;

    public get furniId(): number
    {
        return this._furniId;
    }

    public flush(): boolean
    {
        this._furniId = -1;
        return true;
    }

    public parse(packet: IMessageDataWrapper): boolean
    {
        this._furniId = packet.readInt();
        return true;
    }
}
