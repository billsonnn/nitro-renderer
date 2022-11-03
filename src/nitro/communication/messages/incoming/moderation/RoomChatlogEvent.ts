import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { RoomChatlogMessageParser } from '../../parser';

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
