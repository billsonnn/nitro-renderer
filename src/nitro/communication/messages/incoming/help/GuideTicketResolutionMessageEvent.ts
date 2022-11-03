import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { GuideTicketResolutionMessageParser } from '../../parser';

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
