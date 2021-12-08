import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { RoomInviteParser } from '../../parser/friendlist/RoomInviteMessageParser';

export class RoomInviteEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomInviteParser);
    }

    public getParser(): RoomInviteParser
    {
        return this.parser as RoomInviteParser;
    }
}
