import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { RoomSettingsSaveErrorParser } from '../../parser/roomsettings/RoomSettingsSaveErrorParser';

export class RoomSettingsSaveErrorEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomSettingsSaveErrorParser);
    }

    public getParser(): RoomSettingsSaveErrorParser
    {
        return this.parser as RoomSettingsSaveErrorParser;
    }
}
