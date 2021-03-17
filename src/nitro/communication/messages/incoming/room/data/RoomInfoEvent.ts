import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RoomInfoParser } from '../../../parser/room/data/RoomInfoParser';

export class RoomInfoEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomInfoParser);
    }

    public getParser(): RoomInfoParser
    {
        return this.parser as RoomInfoParser;
    }
}