import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { UserChatlogMessageParser } from '../../parser/moderation/UserChatlogMessageParser';

export class UserChatlogEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserChatlogMessageParser);
    }

    public getParser(): UserChatlogMessageParser
    {
        return this.parser as UserChatlogMessageParser;
    }
}
