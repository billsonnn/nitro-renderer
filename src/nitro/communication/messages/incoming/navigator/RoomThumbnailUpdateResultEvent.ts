import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { RoomThumbnailUpdateResultMessageParser } from '../../parser/navigator/RoomThumbnailUpdateResultMessageParser';

export class RoomThumbnailUpdateResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomThumbnailUpdateResultMessageParser);
    }

    public getParser(): RoomThumbnailUpdateResultMessageParser
    {
        return this.parser as RoomThumbnailUpdateResultMessageParser;
    }
}
