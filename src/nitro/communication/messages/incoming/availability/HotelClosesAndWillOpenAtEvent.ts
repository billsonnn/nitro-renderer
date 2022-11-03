import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { HotelClosesAndWillOpenAtMessageParser } from '../../parser';

export class HotelClosesAndWillOpenAtEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, HotelClosesAndWillOpenAtMessageParser);
    }

    public getParser(): HotelClosesAndWillOpenAtMessageParser
    {
        return this.parser as HotelClosesAndWillOpenAtMessageParser;
    }
}
