import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { CampaignCalendarDataMessageParser } from '../../parser';

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
