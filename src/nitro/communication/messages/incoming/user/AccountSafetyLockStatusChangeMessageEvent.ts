import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { AccountSafetyLockStatusChangeParser } from '../../parser/user/AccountSafetyLockStatusChangeParser';

export class AccountSafetyLockStatusChangeMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AccountSafetyLockStatusChangeParser);
    }

    public getParser(): AccountSafetyLockStatusChangeParser
    {
        return this.parser as AccountSafetyLockStatusChangeParser;
    }
}
