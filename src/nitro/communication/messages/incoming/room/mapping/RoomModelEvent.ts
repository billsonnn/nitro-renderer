import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { RoomModelParser } from '../../../parser/room/mapping/RoomModelParser';

export class RoomModelEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomModelParser);
    }

    public getParser(): RoomModelParser
    {
        return this.parser as RoomModelParser;
    }
}
