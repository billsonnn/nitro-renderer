import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { GuestRoomSearchResultData } from './utils';

export class GuestRoomSearchResultMessageParser implements IMessageParser
{
    _data: GuestRoomSearchResultData;

    public flush(): boolean
    {

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._data = new GuestRoomSearchResultData(wrapper);

        return true;
    }

    public get data(): GuestRoomSearchResultData
    {
        return this._data;
    }
}
