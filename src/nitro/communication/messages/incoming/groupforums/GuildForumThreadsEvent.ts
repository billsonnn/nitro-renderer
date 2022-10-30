import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { GuildForumThreadsParser } from '../../parser/groupforums/GuildForumThreadsParser';

export class GuildForumThreadsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GuildForumThreadsParser);
    }

    public getParser(): GuildForumThreadsParser
    {
        return this.parser as GuildForumThreadsParser;
    }
}
