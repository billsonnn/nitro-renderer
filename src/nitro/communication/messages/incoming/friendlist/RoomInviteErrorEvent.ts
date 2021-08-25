import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { RoomInviteErrorParser } from '../../parser/friendlist/RoomInviteErrorParser';

export class RoomInviteErrorEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomInviteErrorParser);
    }

    public getParser(): RoomInviteErrorParser
    {
        return this.parser as RoomInviteErrorParser;
    }
}
