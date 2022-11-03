import { IRoomSession } from '../../api';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionDanceEvent extends RoomSessionEvent
{
    public static RSDE_DANCE: string = 'RSDE_DANCE';

    private _roomIndex: number;
    private _danceId: number;

    constructor(session: IRoomSession, roomIndex: number, danceId: number)
    {
        super(RoomSessionDanceEvent.RSDE_DANCE, session);

        this._roomIndex = roomIndex;
        this._danceId = danceId;
    }

    public get roomIndex(): number
    {
        return this._roomIndex;
    }

    public get danceId(): number
    {
        return this._danceId;
    }
}
