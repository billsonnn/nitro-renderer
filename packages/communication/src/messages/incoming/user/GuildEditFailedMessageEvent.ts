import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { GuildEditFailedMessageParser } from '../../parser';

export class GuildEditFailedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GuildEditFailedMessageParser);
    }

    public getParser(): GuildEditFailedMessageParser
    {
        return this.parser as GuildEditFailedMessageParser;
    }
}
