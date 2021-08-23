import { IMessageEvent, MessageEvent } from '../../../../../core';
import { GuildMembershipsMessageParser } from '../../parser/user/GuildMembershipsMessageParser';

export class GuildMembershipsMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GuildMembershipsMessageParser);
    }

    public getParser(): GuildMembershipsMessageParser
    {
        return this.parser as GuildMembershipsMessageParser;
    }
}
