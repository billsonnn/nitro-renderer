import { RoomDoorParser } from '../../../parser/room/mapping/RoomDoorParser';
import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';

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