import { IRoomSession, IRoomUserData } from '@/api';
import { RoomSessionEvent } from '@/events';

export class RoomSessionUserDataUpdateEvent extends RoomSessionEvent
{
    public static USER_DATA_UPDATED: string = 'RMUDUE_USER_DATA_UPDATED';

    private _addedUsers: IRoomUserData[];

    constructor(session: IRoomSession, addedUsers: IRoomUserData[])
    {
        super(RoomSessionUserDataUpdateEvent.USER_DATA_UPDATED, session);

        this._addedUsers = addedUsers;
    }

    public get addedUsers(): IRoomUserData[]
    {
        return this._addedUsers;
    }
}
