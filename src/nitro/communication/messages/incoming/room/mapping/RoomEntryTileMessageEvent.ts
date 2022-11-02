import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../core';
import { RoomEntryTileMessageParser } from '../../../parser';

export class RoomEntryTileMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomEntryTileMessageParser);
    }

    public getParser(): RoomEntryTileMessageParser
    {
        return this.parser as RoomEntryTileMessageParser;
    }
}
