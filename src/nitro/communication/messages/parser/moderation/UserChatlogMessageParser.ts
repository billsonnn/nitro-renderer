import { IMessageDataWrapper, IMessageParser } from '../../../../../core';
import { ChatRecordData } from '../../incoming/moderation/ChatRecordData';

export class UserChatlogMessageParser implements IMessageParser
{
    private _userId: number;
    private _username: string;
    private _roomVisits: ChatRecordData[] = [];

    public flush(): boolean
    {
        this._userId   = null;
        this._username = null;
        this._roomVisits = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._userId   = wrapper.readInt();
        this._username = wrapper.readString();
        const size = wrapper.readInt();
        for(let i = 0; i < size; i++)
        {
            this._roomVisits.push(new ChatRecordData(wrapper));
        }

        return true;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get username(): string
    {
        return this._username;
    }

    public get roomVisits(): ChatRecordData[]
    {
        return this._roomVisits;
    }

}
