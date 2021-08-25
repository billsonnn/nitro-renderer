import { IMessageEvent } from '../../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../../core/communication/messages/MessageEvent';
import { RoomDoorbellRejectedParser } from '../../../../parser/room/access/doorbell/RoomDoorbellRejectedParser';

export class RoomDoorbellRejectedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomDoorbellRejectedParser);
    }

    public getParser(): RoomDoorbellRejectedParser
    {
        return this.parser as RoomDoorbellRejectedParser;
    }
}
