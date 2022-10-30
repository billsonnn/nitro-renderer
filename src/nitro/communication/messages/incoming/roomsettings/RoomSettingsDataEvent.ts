import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { RoomSettingsDataParser } from '../../parser/roomsettings/RoomSettingsDataParser';

export class RoomSettingsDataEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomSettingsDataParser);
    }

    public getParser(): RoomSettingsDataParser
    {
        return this.parser as RoomSettingsDataParser;
    }
}
