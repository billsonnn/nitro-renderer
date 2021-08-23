import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { RoomUnitInfoParser } from '../../../parser/room/unit/RoomUnitInfoParser';

export class RoomUnitInfoEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomUnitInfoParser);
    }

    public getParser(): RoomUnitInfoParser
    {
        return this.parser as RoomUnitInfoParser;
    }
}
