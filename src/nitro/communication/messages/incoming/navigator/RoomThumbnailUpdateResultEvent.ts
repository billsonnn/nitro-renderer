import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
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
