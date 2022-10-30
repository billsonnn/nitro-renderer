import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../core';
import { RoomPaintParser } from '../../../parser/room/mapping/RoomPaintParser';

export class RoomPaintEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomPaintParser);
    }

    public getParser(): RoomPaintParser
    {
        return this.parser as RoomPaintParser;
    }
}
