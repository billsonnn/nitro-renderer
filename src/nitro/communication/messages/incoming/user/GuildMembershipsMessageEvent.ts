import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
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
