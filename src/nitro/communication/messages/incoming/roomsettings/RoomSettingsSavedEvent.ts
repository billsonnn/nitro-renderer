import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { RoomSettingsSavedParser } from '../../parser/roomsettings/RoomSettingsSavedParser';

export class RoomSettingsSavedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomSettingsSavedParser);
    }

    public getParser(): RoomSettingsSavedParser
    {
        return this.parser as RoomSettingsSavedParser;
    }
}
