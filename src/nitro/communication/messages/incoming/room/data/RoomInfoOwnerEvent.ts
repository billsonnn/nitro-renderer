import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { RoomInfoOwnerParser } from '../../../parser/room/data/RoomInfoOwnerParser';

export class RoomInfoOwnerEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomInfoOwnerParser);
    }

    public getParser(): RoomInfoOwnerParser
    {
        return this.parser as RoomInfoOwnerParser;
    }
}
