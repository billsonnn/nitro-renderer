import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { GuildMembershipsMessageParser } from '../../parser';

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
