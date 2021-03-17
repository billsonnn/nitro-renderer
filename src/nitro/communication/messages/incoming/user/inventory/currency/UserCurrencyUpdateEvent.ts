import { IMessageEvent } from '../../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../../core/communication/messages/MessageEvent';
import { UserCurrencyUpdateParser } from '../../../../parser/user/inventory/currency/UserCurrencyUpdateParser';

export class UserCurrencyUpdateEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserCurrencyUpdateParser);
    }

    public getParser(): UserCurrencyUpdateParser
    {
        return this.parser as UserCurrencyUpdateParser;
    }
}