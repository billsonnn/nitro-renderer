import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { GuildForumThread } from './GuildForumThread';

export class UpdateThreadMessageParser implements IMessageParser
{
    private _groupId: number;
    private _thread: GuildForumThread;

    public flush(): boolean
    {
        this._groupId = -1;
        this._thread = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._groupId = wrapper.readInt();
        this._thread = GuildForumThread.parse(wrapper);

        return true;
    }

    public get groupId(): number
    {
        return this._groupId;
    }

    public get thread(): GuildForumThread
    {
        return this._thread;
    }
}
