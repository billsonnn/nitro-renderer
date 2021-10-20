import { IMessageDataWrapper, IMessageParser } from '../../../../../core';
import { ChatRecordData } from './utils/ChatRecordData';

export class ModtoolRoomChatlogParser implements IMessageParser
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
