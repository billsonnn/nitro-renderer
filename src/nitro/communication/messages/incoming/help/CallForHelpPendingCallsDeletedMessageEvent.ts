import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { CallForHelpPendingCallsDeletedMessageParser } from '../../parser';

export class CallForHelpPendingCallsDeletedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CallForHelpPendingCallsDeletedMessageParser);
    }

    public getParser(): CallForHelpPendingCallsDeletedMessageParser
    {
        return this.parser as CallForHelpPendingCallsDeletedMessageParser;
    }
}
