import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { UserBannedMessageParser } from '../../parser/moderation';

export class UserBannedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserBannedMessageParser);
    }

    public getParser(): UserBannedMessageParser
    {
        return this.parser as UserBannedMessageParser;
    }
}
