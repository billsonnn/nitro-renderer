import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
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
