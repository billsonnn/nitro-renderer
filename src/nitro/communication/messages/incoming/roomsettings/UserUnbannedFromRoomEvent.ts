import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
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
