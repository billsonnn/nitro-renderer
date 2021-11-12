import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RoomReadyMessageParser } from '../../../parser/room/mapping/RoomReadyMessageParser';

export class RoomReadyMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomReadyMessageParser);
    }

    public getParser(): RoomReadyMessageParser
    {
        return this.parser as RoomReadyMessageParser;
    }
}
