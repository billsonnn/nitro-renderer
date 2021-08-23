import { IMessageEvent, MessageEvent } from '../../../../../../../core';
import { RoomDoorbellAcceptedParser } from '../../../../parser/room/access/doorbell/RoomDoorbellAcceptedParser';

export class RoomDoorbellAcceptedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomDoorbellAcceptedParser);
    }

    public getParser(): RoomDoorbellAcceptedParser
    {
        return this.parser as RoomDoorbellAcceptedParser;
    }
}
