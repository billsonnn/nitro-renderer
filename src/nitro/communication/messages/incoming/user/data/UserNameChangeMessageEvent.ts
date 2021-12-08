import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { UserNameChangeMessageParser } from '../../../parser/user/data/UserNameChangeMessageParser';

export class UserNameChangeMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserNameChangeMessageParser);
    }

    public getParser(): UserNameChangeMessageParser
    {
        return this.parser as UserNameChangeMessageParser;
    }
}
