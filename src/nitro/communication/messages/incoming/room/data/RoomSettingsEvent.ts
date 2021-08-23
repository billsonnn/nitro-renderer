import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { RoomSettingsParser } from '../../../parser/room/data/RoomSettingsParser';

export class RoomSettingsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomSettingsParser);
    }

    public getParser(): RoomSettingsParser
    {
        return this.parser as RoomSettingsParser;
    }
}
