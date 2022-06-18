import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';
import { GuestRoomSearchResultData } from './utils/GuestRoomSearchResultData';

export class GuestRoomSearchResultMessageParser implements IMessageParser
{
    _data:GuestRoomSearchResultData;

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

    public get data():GuestRoomSearchResultData
    {
        return this._data;
    }
}
