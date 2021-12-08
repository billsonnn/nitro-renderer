import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RoomCreatedParser } from '../../../parser/room/engine/RoomCreatedParser';

export class RoomCreatedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomCreatedParser);
    }

    public getParser(): RoomCreatedParser
    {
        return this.parser as RoomCreatedParser;
    }
}
