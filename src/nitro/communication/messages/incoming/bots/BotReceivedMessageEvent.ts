import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { BotReceivedMessageParser } from '../../parser';

export class BotReceivedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BotReceivedMessageParser);
    }

    public getParser(): BotReceivedMessageParser
    {
        return this.parser as BotReceivedMessageParser;
    }
}
