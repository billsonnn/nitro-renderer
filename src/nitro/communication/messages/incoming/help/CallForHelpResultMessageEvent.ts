import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
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
