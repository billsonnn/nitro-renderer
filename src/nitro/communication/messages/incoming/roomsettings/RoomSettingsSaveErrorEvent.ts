import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { RoomSettingsSaveErrorParser } from '../../parser';

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
