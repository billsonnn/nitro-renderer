import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { UserEventCatsMessageParser } from '../../parser/navigator/UserEventCatsMessageParser';

export class UserEventCatsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserEventCatsMessageParser);
    }

    public getParser(): UserEventCatsMessageParser
    {
        return this.parser as UserEventCatsMessageParser;
    }
}
