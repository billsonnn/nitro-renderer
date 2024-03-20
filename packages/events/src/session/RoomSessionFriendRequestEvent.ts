import { IRoomSession } from '@nitrots/api';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionFriendRequestEvent extends RoomSessionEvent
{
    public static RSFRE_FRIEND_REQUEST: string = 'RSFRE_FRIEND_REQUEST';

    private _requestId: number = 0;
    private _userId: number = 0;
    private _userName: string;

    constructor(session: IRoomSession, requestId: number, userId: number, userName: string)
    {
        super(RoomSessionFriendRequestEvent.RSFRE_FRIEND_REQUEST, session);

        this._requestId = requestId;
        this._userId = userId;
        this._userName = userName;
    }

    public get requestId(): number
    {
        return this._requestId;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get userName(): string
    {
        return this._userName;
    }
}
