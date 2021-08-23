import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { RoomThicknessParser } from '../../../parser/room/mapping/RoomThicknessParser';

export class RoomThicknessEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomThicknessParser);
    }

    public getParser(): RoomThicknessParser
    {
        return this.parser as RoomThicknessParser;
    }
}
