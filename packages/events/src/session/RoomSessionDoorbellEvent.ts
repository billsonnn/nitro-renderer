import { IRoomSession } from '@nitrots/api';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionDoorbellEvent extends RoomSessionEvent
{
    public static DOORBELL: string = 'RSDE_DOORBELL';
    public static RSDE_REJECTED: string = 'RSDE_REJECTED';
    public static RSDE_ACCEPTED: string = 'RSDE_ACCEPTED';

    private _userName: string = '';

    constructor(type: string, session: IRoomSession, userName: string)
    {
        super(type, session);

        this._userName = userName;
    }

    public get userName(): string
    {
        return this._userName;
    }
}
