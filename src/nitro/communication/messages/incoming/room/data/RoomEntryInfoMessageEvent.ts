import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RoomEntryInfoMessageParser } from '../../../parser/room/data/RoomEntryInfoMessageParser';

export class RoomEntryInfoMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomEntryInfoMessageParser);
    }

    public getParser(): RoomEntryInfoMessageParser
    {
        return this.parser as RoomEntryInfoMessageParser;
    }
}
