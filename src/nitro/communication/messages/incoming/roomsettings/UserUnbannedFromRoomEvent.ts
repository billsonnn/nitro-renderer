import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { UserUnbannedFromRoomParser } from '../../parser/roomsettings/UserUnbannedFromRoomParser';

export class UserUnbannedFromRoomEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserUnbannedFromRoomParser);
    }

    public getParser(): UserUnbannedFromRoomParser
    {
        return this.parser as UserUnbannedFromRoomParser;
    }
}
