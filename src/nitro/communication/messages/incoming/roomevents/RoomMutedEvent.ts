import { IMessageEvent, MessageEvent } from '../../../../../core';
import { RoomMutedParser } from '../../parser/roomevents/RoomMutedParser';

export class RoomMutedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomMutedParser);
    }

    public getParser(): RoomMutedParser
    {
        return this.parser as RoomMutedParser;
    }
}
