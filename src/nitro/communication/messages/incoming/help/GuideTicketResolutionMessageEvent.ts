import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { GuideTicketResolutionMessageParser } from '../../parser/help/GuideTicketResolutionMessageParser';

export class GuideTicketResolutionMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GuideTicketResolutionMessageParser);
    }

    public getParser(): GuideTicketResolutionMessageParser
    {
        return this.parser as GuideTicketResolutionMessageParser;
    }
}
