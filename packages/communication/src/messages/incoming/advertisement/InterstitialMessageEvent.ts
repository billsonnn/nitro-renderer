import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { InterstitialMessageParser } from '../../parser';

export class InterstitialMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, InterstitialMessageParser);
    }

    public getParser(): InterstitialMessageParser
    {
        return this.parser as InterstitialMessageParser;
    }
}
