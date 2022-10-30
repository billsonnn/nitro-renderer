import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { CallForHelpPendingCallsMessageParser } from '../../parser/help/CallForHelpPendingCallsMessageParser';

export class CallForHelpPendingCallsMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CallForHelpPendingCallsMessageParser);
    }

    public getParser(): CallForHelpPendingCallsMessageParser
    {
        return this.parser as CallForHelpPendingCallsMessageParser;
    }
}
