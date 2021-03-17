import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RoomSettingsSavedParser } from '../../../parser/room/data/RoomSettingsSavedParser';

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