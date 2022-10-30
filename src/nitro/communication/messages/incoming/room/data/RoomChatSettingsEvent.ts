import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../core';
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
