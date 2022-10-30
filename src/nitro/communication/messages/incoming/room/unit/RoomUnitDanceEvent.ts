import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../core';
import { RoomUnitDanceParser } from '../../../parser/room/unit/RoomUnitDanceParser';

export class RoomUnitDanceEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomUnitDanceParser);
    }

    public getParser(): RoomUnitDanceParser
    {
        return this.parser as RoomUnitDanceParser;
    }
}
