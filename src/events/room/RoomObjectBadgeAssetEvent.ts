import { IRoomObject } from '../../api';
import { RoomObjectEvent } from './RoomObjectEvent';

export class RoomObjectBadgeAssetEvent extends RoomObjectEvent
{
    public static LOAD_BADGE: string = 'ROBAE_LOAD_BADGE';

    private _badgeId: string;
    private _groupBadge: boolean;

    constructor(k: string, _arg_2: IRoomObject, badgeId: string, groupBadge: boolean = true)
    {
        super(k, _arg_2);

        this._badgeId = badgeId;
        this._groupBadge = groupBadge;
    }

    public get badgeId(): string
    {
        return this._badgeId;
    }

    public get groupBadge(): boolean
    {
        return this._groupBadge;
    }
}
