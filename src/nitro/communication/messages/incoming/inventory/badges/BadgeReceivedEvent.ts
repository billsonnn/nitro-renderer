import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { BadgeReceivedParser } from '../../../parser/inventory/badges/BadgeReceivedParser';

export class BadgeReceivedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BadgeReceivedParser);
    }

    public getParser(): BadgeReceivedParser
    {
        return this.parser as BadgeReceivedParser;
    }
}
