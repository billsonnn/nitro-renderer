import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { HotelWillShutdownParser } from '../../parser/notifications/HotelWillShutdownParser';

export class HotelWillShutdownEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, HotelWillShutdownParser);
    }

    public getParser(): HotelWillShutdownParser
    {
        return this.parser as HotelWillShutdownParser;
    }
}
