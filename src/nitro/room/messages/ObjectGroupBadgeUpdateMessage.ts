import { RoomObjectUpdateMessage } from '../../../room';

export class ObjectGroupBadgeUpdateMessage extends RoomObjectUpdateMessage
{
    public static BADGE_LOADED: string = 'ROGBUM_BADGE_LOADED';

    private _badgeId: string;
    private _assetName: string;

    constructor(badgeId: string, assetName: string)
    {
        super(null, null);

        this._badgeId = badgeId;
        this._assetName = assetName;
    }

    public get badgeId(): string
    {
        return this._badgeId;
    }

    public get assetName(): string
    {
        return this._assetName;
    }
}
