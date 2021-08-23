import { IMessageEvent, MessageEvent } from '../../../../../../../core';
import { PresentOpenedMessageParser } from '../../../../parser/inventory/furniture/PresentOpenedMessageParser';

export class PresentOpenedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PresentOpenedMessageParser);
    }

    public getParser(): PresentOpenedMessageParser
    {
        return this.parser as PresentOpenedMessageParser;
    }
}
