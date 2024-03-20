import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { ChatRecordData } from './ChatRecordData';

export class RoomChatlogMessageParser implements IMessageParser
{
    private _data: ChatRecordData;

    public flush(): boolean
    {
        this._data = null;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._data = new ChatRecordData(wrapper);

        return true;
    }

    public get data(): ChatRecordData
    {
        return this._data;
    }
}
