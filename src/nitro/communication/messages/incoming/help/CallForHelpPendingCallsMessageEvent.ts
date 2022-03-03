import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
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
