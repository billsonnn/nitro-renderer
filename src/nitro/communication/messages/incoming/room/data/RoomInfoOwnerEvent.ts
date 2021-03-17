import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RoomInfoOwnerParser } from '../../../parser/room/data/RoomInfoOwnerParser';

export class RoomInfoOwnerEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomInfoOwnerParser);
    }

    public getParser(): RoomInfoOwnerParser
    {
        return this.parser as RoomInfoOwnerParser;
    }
}