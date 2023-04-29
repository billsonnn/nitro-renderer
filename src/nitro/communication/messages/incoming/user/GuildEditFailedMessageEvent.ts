import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
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
