import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { UserPerksParser } from '../../../parser/user/access/UserPerksParser';

export class UserPerksEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserPerksParser);
    }

    public getParser(): UserPerksParser
    {
        return this.parser as UserPerksParser;
    }
}