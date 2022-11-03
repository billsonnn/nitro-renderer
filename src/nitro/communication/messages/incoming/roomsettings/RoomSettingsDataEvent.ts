import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { RoomSettingsDataParser } from '../../parser';

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
