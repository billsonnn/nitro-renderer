import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { RoomMutedParser } from '../../parser/roomevents/RoomMutedParser';

export class RoomMutedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomMutedParser);
    }

    public getParser(): RoomMutedParser
    {
        return this.parser as RoomMutedParser;
    }
}
