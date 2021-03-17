import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { UserCurrentBadgesParser } from '../../../parser/user/data/UserCurrentBadgesParser';

export class UserCurrentBadgesEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserCurrentBadgesParser);
    }

    public getParser(): UserCurrentBadgesParser
    {
        return this.parser as UserCurrentBadgesParser;
    }
}