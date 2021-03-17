import { IRoomSession } from '../IRoomSession';
import { RoomUserData } from '../RoomUserData';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionUserDataUpdateEvent extends RoomSessionEvent
{
    public static USER_DATA_UPDATED: string = 'RMUDUE_USER_DATA_UPDATED';

    private _addedUsers: RoomUserData[];

    constructor(session: IRoomSession, addedUsers: RoomUserData[])
    {
        super(RoomSessionUserDataUpdateEvent.USER_DATA_UPDATED, session);

        this._addedUsers = addedUsers;
    }

    public get addedUsers(): RoomUserData[]
    {
        return this._addedUsers;
    }
}