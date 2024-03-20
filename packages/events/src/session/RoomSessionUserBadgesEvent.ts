import { IRoomSession } from '@nitrots/api';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionUserBadgesEvent extends RoomSessionEvent
{
    public static RSUBE_BADGES: string = 'RSUBE_BADGES';

    private _userId: number = 0;
    private _badges: string[];

    constructor(k: IRoomSession, _arg_2: number, _arg_3: string[])
    {
        super(RoomSessionUserBadgesEvent.RSUBE_BADGES, k);

        this._badges = [];
        this._userId = _arg_2;
        this._badges = _arg_3;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get badges(): string[]
    {
        return this._badges;
    }
}
