import { IMessageEvent, MessageEvent } from '../../../../../core';
import { ModtoolRoomChatlogParser } from '../../parser/modtool/ModtoolRoomChatlogParser';

export class ModtoolRoomChatlogEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ModtoolRoomChatlogParser);
    }

    public getParser(): ModtoolRoomChatlogParser
    {
        return this.parser as ModtoolRoomChatlogParser;
    }
}
