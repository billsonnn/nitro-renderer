import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { RoomSettingsErrorParser } from '../../parser';

export class RoomSettingsErrorEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomSettingsErrorParser);
    }

    public getParser(): RoomSettingsErrorParser
    {
        return this.parser as RoomSettingsErrorParser;
    }
}
