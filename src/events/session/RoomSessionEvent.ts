import { IRoomSession } from '../../api';
import { NitroEvent } from '../core';

export class RoomSessionEvent extends NitroEvent
{
    public static CREATED: string = 'RSE_CREATED';
    public static STARTED: string = 'RSE_STARTED';
    public static ENDED: string = 'RSE_ENDED';
    public static ROOM_DATA: string = 'RSE_ROOM_DATA';

    private _session: IRoomSession;
    private _openLandingView: boolean;

    constructor(type: string, session: IRoomSession, openLandingView: boolean = true)
    {
        super(type);

        this._session = session;
        this._openLandingView = openLandingView;
    }

    public get session(): IRoomSession
    {
        return this._session;
    }

    public get openLandingView(): boolean
    {
        return this._openLandingView;
    }
}
