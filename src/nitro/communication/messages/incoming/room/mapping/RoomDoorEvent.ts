import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RoomDoorParser } from '../../../parser/room/mapping/RoomDoorParser';

export class RoomDoorEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomDoorParser);
    }

    public getParser(): RoomDoorParser
    {
        return this.parser as RoomDoorParser;
    }
}
