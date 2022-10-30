import { IMessageEvent } from '../../../../../../../api';
import { MessageEvent } from '../../../../../../../core';
import { UserSubscriptionParser } from '../../../../parser/user/inventory/subscription/UserSubscriptionParser';

export class UserSubscriptionEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserSubscriptionParser);
    }

    public getParser(): UserSubscriptionParser
    {
        return this.parser as UserSubscriptionParser;
    }
}
