import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
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
