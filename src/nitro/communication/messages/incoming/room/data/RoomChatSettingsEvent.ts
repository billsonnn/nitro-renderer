import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RoomChatSettingsParser } from '../../../parser/room/data/RoomChatSettingsParser';

export class RoomChatSettingsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomChatSettingsParser);
    }

    public getParser(): RoomChatSettingsParser
    {
        return this.parser as RoomChatSettingsParser;
    }
}