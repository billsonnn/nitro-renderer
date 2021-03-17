import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RoomEnterParser } from '../../../parser/room/access/RoomEnterParser';

export class RoomEnterEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomEnterParser);
    }

    public getParser(): RoomEnterParser
    {
        return this.parser as RoomEnterParser;
    }
}