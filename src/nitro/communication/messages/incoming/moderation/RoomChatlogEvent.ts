import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { RoomChatlogMessageParser } from '../../parser/moderation/RoomChatlogMessageParser';

export class RoomChatlogEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomChatlogMessageParser);
    }

    public getParser(): RoomChatlogMessageParser
    {
        return this.parser as RoomChatlogMessageParser;
    }
}
