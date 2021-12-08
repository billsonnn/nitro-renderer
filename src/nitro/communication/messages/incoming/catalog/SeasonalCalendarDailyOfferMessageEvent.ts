import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { SeasonalCalendarDailyOfferMessageParser } from '../../parser';

export class SeasonalCalendarDailyOfferMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, SeasonalCalendarDailyOfferMessageParser);
    }

    public getParser(): SeasonalCalendarDailyOfferMessageParser
    {
        return this.parser as SeasonalCalendarDailyOfferMessageParser;
    }
}
