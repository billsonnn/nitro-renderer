import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { IdentityAccountsParser } from '../../parser';

export class IdentityAccountsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, IdentityAccountsParser);
    }

    public getParser(): IdentityAccountsParser
    {
        return this.parser as IdentityAccountsParser;
    }
}
