import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { RoomEntryData } from '../user';

export class RoomAdPurchaseInfoEventParser implements IMessageParser
{
    private _isVip: boolean;
    private _rooms: RoomEntryData[];

    public flush(): boolean
    {
        this._isVip = false;
        this._rooms = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._isVip = wrapper.readBoolean();

        let count = wrapper.readInt();

        while(count > 0)
        {
            this._rooms.push(new RoomEntryData(wrapper.readInt(), wrapper.readString(), wrapper.readBoolean()));

            count--;
        }

        return true;
    }

    public get isVip(): boolean
    {
        return this._isVip;
    }

    public get rooms(): RoomEntryData[]
    {
        return this._rooms;
    }
}
