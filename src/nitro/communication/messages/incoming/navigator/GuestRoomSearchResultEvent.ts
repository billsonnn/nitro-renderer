import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { GuestRoomSearchResultMessageParser } from '../../parser/navigator/GuestRoomSearchResultMessageParser';

export class GuestRoomSearchResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GuestRoomSearchResultMessageParser);
    }

    public getParser(): GuestRoomSearchResultMessageParser
    {
        return this.parser as GuestRoomSearchResultMessageParser;
    }
}
