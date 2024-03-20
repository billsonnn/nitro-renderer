import { IMessageDataWrapper } from '@nitrots/api';
import { ChatRecordData } from './ChatRecordData';

export class UserChatlogData
{
    private _userId: number;
    private _username: string;
    private _roomChatlogs: ChatRecordData[] = [];

    constructor(wrapper: IMessageDataWrapper)
    {
        this._userId = wrapper.readInt();
        this._username = wrapper.readString();
        const size = wrapper.readInt();
        for(let i = 0; i < size; i++)
        {
            this._roomChatlogs.push(new ChatRecordData(wrapper));
        }
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get username(): string
    {
        return this._username;
    }

    public get roomChatlogs(): ChatRecordData[]
    {
        return this._roomChatlogs;
    }
}
