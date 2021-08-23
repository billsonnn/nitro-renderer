import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { RoomSettingsUpdatedParser } from '../../../parser/room/data/RoomSettingsUpdatedParser';

export class RoomSettingsUpdatedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomSettingsUpdatedParser);
    }

    public getParser(): RoomSettingsUpdatedParser
    {
        return this.parser as RoomSettingsUpdatedParser;
    }
}
