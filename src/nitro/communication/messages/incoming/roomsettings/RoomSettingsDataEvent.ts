import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
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
