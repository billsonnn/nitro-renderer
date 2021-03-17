import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RoomHeightMapUpdateParser } from '../../../parser/room/mapping/RoomHeightMapUpdateParser';

export class RoomHeightMapUpdateEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomHeightMapUpdateParser);
    }

    public getParser(): RoomHeightMapUpdateParser
    {
        return this.parser as RoomHeightMapUpdateParser;
    }
}