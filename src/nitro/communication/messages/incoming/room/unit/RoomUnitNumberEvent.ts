import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RoomUnitNumberParser } from '../../../parser/room/unit/RoomUnitNumberParser';

export class RoomUnitNumberEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomUnitNumberParser);
    }

    public getParser(): RoomUnitNumberParser
    {
        return this.parser as RoomUnitNumberParser;
    }
}
