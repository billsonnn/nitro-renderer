import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { RoomBlockedTilesParser } from '../../../parser/room/mapping/RoomBlockedTilesParser';

export class RoomBlockedTilesEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomBlockedTilesParser);
    }

    public getParser(): RoomBlockedTilesParser
    {
        return this.parser as RoomBlockedTilesParser;
    }
}
