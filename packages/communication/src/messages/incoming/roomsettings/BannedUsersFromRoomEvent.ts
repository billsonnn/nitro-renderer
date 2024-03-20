import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { BannedUsersFromRoomParser } from '../../parser';

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
