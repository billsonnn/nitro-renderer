import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { PerkAllowancesMessageParser } from './../../parser';

export class PerkAllowancesMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PerkAllowancesMessageParser);
    }

    public getParser(): PerkAllowancesMessageParser
    {
        return this.parser as PerkAllowancesMessageParser;
    }
}
