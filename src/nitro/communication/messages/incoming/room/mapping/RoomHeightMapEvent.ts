import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RoomHeightMapParser } from '../../../parser/room/mapping/RoomHeightMapParser';

export class RoomHeightMapEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomHeightMapParser);
    }

    public getParser(): RoomHeightMapParser
    {
        return this.parser as RoomHeightMapParser;
    }
}
