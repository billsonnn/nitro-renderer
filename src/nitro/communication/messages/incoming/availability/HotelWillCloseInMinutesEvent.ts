import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { HotelWillCloseInMinutesMessageParser } from '../../parser';

export class HotelWillCloseInMinutesEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, HotelWillCloseInMinutesMessageParser);
    }

    public getParser(): HotelWillCloseInMinutesMessageParser
    {
        return this.parser as HotelWillCloseInMinutesMessageParser;
    }
}
