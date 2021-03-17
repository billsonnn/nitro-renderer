import { IMessageEvent } from '../../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../../core/communication/messages/MessageEvent';
import { RoomUnitTypingParser } from '../../../../parser/room/unit/chat/RoomUnitTypingParser';

export class RoomUnitTypingEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomUnitTypingParser);
    }

    public getParser(): RoomUnitTypingParser
    {
        return this.parser as RoomUnitTypingParser;
    }
}