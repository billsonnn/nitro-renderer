import { IMessageEvent, MessageEvent } from '../../../../../core';
import { CallForHelpResultMessageParser } from '../../parser/help/CallForHelpResultMessageParser';

export class CallForHelpResultMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CallForHelpResultMessageParser);
    }

    public getParser(): CallForHelpResultMessageParser
    {
        return this.parser as CallForHelpResultMessageParser;
    }
}
