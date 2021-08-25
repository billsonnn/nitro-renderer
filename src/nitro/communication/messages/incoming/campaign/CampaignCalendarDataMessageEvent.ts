import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CampaignCalendarDataMessageParser } from '../../parser/campaign';

export class CampaignCalendarDataMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CampaignCalendarDataMessageParser);
    }

    public getParser(): CampaignCalendarDataMessageParser
    {
        return this.parser as CampaignCalendarDataMessageParser;
    }
}
