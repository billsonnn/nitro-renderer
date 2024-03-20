import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { GuildForumThread } from './GuildForumThread';

export class GuildForumThreadsParser implements IMessageParser
{
    private _groupId: number;
    private _startIndex: number;
    private _amount: number;
    private _threads: GuildForumThread[];

    public flush(): boolean
    {
        this._groupId = -1;
        this._startIndex = -1;
        this._amount = 0;
        this._threads = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._groupId = wrapper.readInt();
        this._startIndex = wrapper.readInt();
        this._amount = wrapper.readInt();
        this._threads = [];

        let i = 0;

        while(i < this._amount)
        {
            this._threads.push(GuildForumThread.parse(wrapper));

            i++;
        }

        return true;
    }

    public get groupId(): number
    {
        return this._groupId;
    }

    public get startIndex(): number
    {
        return this._startIndex;
    }

    public get amount(): number
    {
        return this._amount;
    }

    public get threads(): GuildForumThread[]
    {
        return this._threads;
    }
}
