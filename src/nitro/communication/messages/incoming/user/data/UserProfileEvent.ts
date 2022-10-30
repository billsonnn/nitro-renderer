import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { UserProfileParser } from '../../../parser/user/data/UserProfileParser';

export class UserProfileEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserProfileParser);
    }

    public getParser(): UserProfileParser
    {
        return this.parser as UserProfileParser;
    }
}
