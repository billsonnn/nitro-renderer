import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { RoomUnitStatusParser } from '../../../parser/room/unit/RoomUnitStatusParser';

export class RoomUnitStatusEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomUnitStatusParser);
    }

    public getParser(): RoomUnitStatusParser
    {
        return this.parser as RoomUnitStatusParser;
    }
}
