import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RoomSettingsUpdatedParser } from '../../../parser/room/data/RoomSettingsUpdatedParser';

export class RoomSettingsUpdatedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomSettingsUpdatedParser);
    }

    public getParser(): RoomSettingsUpdatedParser
    {
        return this.parser as RoomSettingsUpdatedParser;
    }
}