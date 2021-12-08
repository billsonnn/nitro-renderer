import { IMessageDataWrapper, IMessageParser } from '../../../../../core';
import { UserChatlogData } from '../../incoming/moderation/UserChatlogData';

export class UserChatlogMessageParser implements IMessageParser
{
    private _data:UserChatlogData;

    public flush(): boolean
    {
        this._data = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._data = new UserChatlogData(wrapper);

        return true;
    }

    public get data():UserChatlogData
    {
        return this._data;
    }
}
