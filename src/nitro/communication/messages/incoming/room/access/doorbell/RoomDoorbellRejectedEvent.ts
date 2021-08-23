import { IMessageEvent, MessageEvent } from '../../../../../../../core';
import { RoomDoorbellRejectedParser } from '../../../../parser/room/access/doorbell/RoomDoorbellRejectedParser';

export class RoomDoorbellRejectedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomDoorbellRejectedParser);
    }

    public getParser(): RoomDoorbellRejectedParser
    {
        return this.parser as RoomDoorbellRejectedParser;
    }
}
