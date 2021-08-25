import { IMessageEvent } from '../../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../../core/communication/messages/MessageEvent';
import { RoomDoorbellAcceptedParser } from '../../../../parser/room/access/doorbell/RoomDoorbellAcceptedParser';

export class RoomDoorbellAcceptedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomDoorbellAcceptedParser);
    }

    public getParser(): RoomDoorbellAcceptedParser
    {
        return this.parser as RoomDoorbellAcceptedParser;
    }
}
