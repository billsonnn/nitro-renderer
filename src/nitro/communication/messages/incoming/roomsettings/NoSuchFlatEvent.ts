import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { NoSuchFlatParser } from '../../parser/roomsettings/NoSuchFlatParser';

export class NoSuchFlatEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NoSuchFlatParser);
    }

    public getParser(): NoSuchFlatParser
    {
        return this.parser as NoSuchFlatParser;
    }
}
