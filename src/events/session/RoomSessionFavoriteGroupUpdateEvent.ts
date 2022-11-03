import { IRoomSession } from '../../api';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionFavoriteGroupUpdateEvent extends RoomSessionEvent
{
    public static FAVOURITE_GROUP_UPDATE: string = 'RSFGUE_FAVOURITE_GROUP_UPDATE';

    private _roomIndex: number;
    private _habboGroupId: number;
    private _habboGroupName: string;
    private _status: number;

    constructor(session: IRoomSession, roomIndex: number, groupId: number, status: number, groupName: string)
    {
        super(RoomSessionFavoriteGroupUpdateEvent.FAVOURITE_GROUP_UPDATE, session);

        this._roomIndex = roomIndex;
        this._habboGroupId = groupId;
        this._habboGroupName = groupName;
        this._status = status;
    }

    public get roomIndex(): number
    {
        return this._roomIndex;
    }

    public get habboGroupId(): number
    {
        return this._habboGroupId;
    }

    public get habboGroupName(): string
    {
        return this._habboGroupName;
    }

    public get status(): number
    {
        return this._status;
    }
}
