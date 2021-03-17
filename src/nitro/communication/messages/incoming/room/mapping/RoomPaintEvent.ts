import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RoomPaintParser } from '../../../parser/room/mapping/RoomPaintParser';

export class RoomPaintEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomPaintParser);
    }

    public getParser(): RoomPaintParser
    {
        return this.parser as RoomPaintParser;
    }
}