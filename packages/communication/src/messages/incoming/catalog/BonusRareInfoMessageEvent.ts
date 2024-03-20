import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { BonusRareInfoMessageParser } from '../../parser';

export class BonusRareInfoMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BonusRareInfoMessageParser);
    }

    public getParser(): BonusRareInfoMessageParser
    {
        return this.parser as BonusRareInfoMessageParser;
    }
}
