import { IMessageEvent } from '../../../../../../../api';
import { MessageEvent } from '../../../../../../../core';
import { UserCurrencyParser } from '../../../../parser';

export class UserCurrencyEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserCurrencyParser);
    }

    public getParser(): UserCurrencyParser
    {
        return this.parser as UserCurrencyParser;
    }
}
