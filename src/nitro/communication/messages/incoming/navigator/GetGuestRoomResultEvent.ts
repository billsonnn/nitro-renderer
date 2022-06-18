import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { GetGuestRoomResultMessageParser } from '../../parser/navigator/GetGuestRoomResultMessageParser';

export class GetGuestRoomResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GetGuestRoomResultMessageParser);
    }

    public getParser(): GetGuestRoomResultMessageParser
    {
        return this.parser as GetGuestRoomResultMessageParser;
    }
}
