import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { CallForHelpPendingCallsMessageParser } from '../../parser';

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
