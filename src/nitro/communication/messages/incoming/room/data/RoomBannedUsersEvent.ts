import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { RoomSettingsUsersListParser } from '../../../parser/room/data/RoomSettingsUsersListParser';

export class RoomBannedUsersEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomSettingsUsersListParser);
    }

    public getParser(): RoomSettingsUsersListParser
    {
        return this.parser as RoomSettingsUsersListParser;
    }
}
