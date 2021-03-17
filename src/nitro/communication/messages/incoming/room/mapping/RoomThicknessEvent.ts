import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RoomThicknessParser } from '../../../parser/room/mapping/RoomThicknessParser';

export class RoomThicknessEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomThicknessParser);
    }

    public getParser(): RoomThicknessParser
    {
        return this.parser as RoomThicknessParser;
    }
}