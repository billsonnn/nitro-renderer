import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { BotErrorEventParser } from '../../parser';

export class BotErrorEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BotErrorEventParser);
    }

    public getParser(): BotErrorEventParser
    {
        return this.parser as BotErrorEventParser;
    }
}
