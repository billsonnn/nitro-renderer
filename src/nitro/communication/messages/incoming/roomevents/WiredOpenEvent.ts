import { IMessageEvent, MessageEvent } from '../../../../../core';
import { WiredOpenParser } from '../../parser/roomevents/WiredOpenParser';

export class WiredOpenEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, WiredOpenParser);
    }

    public getParser(): WiredOpenParser
    {
        return this.parser as WiredOpenParser;
    }
}
