import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { HotelClosedAndOpensMessageParser } from '../../parser';

export class HotelClosedAndOpensEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, HotelClosedAndOpensMessageParser);
    }

    public getParser(): HotelClosedAndOpensMessageParser
    {
        return this.parser as HotelClosedAndOpensMessageParser;
    }
}
