import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RoomEntryTileMessageParser } from '../../../parser/room/mapping/RoomEntryTileMessageParser';

export class RoomEntryTileMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomEntryTileMessageParser);
    }

    public getParser(): RoomEntryTileMessageParser
    {
        return this.parser as RoomEntryTileMessageParser;
    }
}
