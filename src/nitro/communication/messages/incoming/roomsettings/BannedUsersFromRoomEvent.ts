import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { BannedUsersFromRoomParser } from '../../parser/roomsettings/BannedUsersFromRoomParser';

export class BannedUsersFromRoomEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BannedUsersFromRoomParser);
    }

    public getParser(): BannedUsersFromRoomParser
    {
        return this.parser as BannedUsersFromRoomParser;
    }
}
