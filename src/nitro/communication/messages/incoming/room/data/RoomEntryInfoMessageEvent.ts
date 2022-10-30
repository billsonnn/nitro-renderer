import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../core';
import { RoomEntryInfoMessageParser } from '../../../parser/room/data/RoomEntryInfoMessageParser';

export class RoomEntryInfoMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomEntryInfoMessageParser);
    }

    public getParser(): RoomEntryInfoMessageParser
    {
        return this.parser as RoomEntryInfoMessageParser;
    }
}
