import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class RoomUnitHandItemReceivedParser implements IMessageParser
{
    private _giverUserId: number;
    private _handItemType: number;

    public flush(): boolean
    {
        this._giverUserId = -1;
        this._handItemType = -1;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._giverUserId = wrapper.readInt();
        this._handItemType = wrapper.readInt();

        return true;
    }

    public get giverUserId(): number
    {
        return this._giverUserId;
    }

    public get handItemType(): number
    {
        return this._handItemType;
    }
}
