import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
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
