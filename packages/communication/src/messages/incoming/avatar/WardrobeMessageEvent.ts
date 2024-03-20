import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { WardrobeMessageParser } from '../../parser';

export class WardrobeMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, WardrobeMessageParser);
    }

    public getParser(): WardrobeMessageParser
    {
        return this.parser as WardrobeMessageParser;
    }
}
