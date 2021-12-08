import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CampaignCalendarDoorOpenedMessageParser } from '../../parser/campaign';

export class CampaignCalendarDoorOpenedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CampaignCalendarDoorOpenedMessageParser);
    }

    public getParser(): CampaignCalendarDoorOpenedMessageParser
    {
        return this.parser as CampaignCalendarDoorOpenedMessageParser;
    }
}
