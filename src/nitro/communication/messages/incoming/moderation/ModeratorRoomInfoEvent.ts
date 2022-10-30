import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { ModeratorRoomInfoMessageParser } from '../../parser/moderation/ModeratorRoomInfoMessageParser';

export class ModeratorRoomInfoEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ModeratorRoomInfoMessageParser);
    }

    public getParser(): ModeratorRoomInfoMessageParser
    {
        return this.parser as ModeratorRoomInfoMessageParser;
    }
}
