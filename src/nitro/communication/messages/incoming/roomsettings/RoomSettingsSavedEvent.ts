import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { RoomSettingsSavedParser } from '../../parser';

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
