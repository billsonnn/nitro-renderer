import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
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
