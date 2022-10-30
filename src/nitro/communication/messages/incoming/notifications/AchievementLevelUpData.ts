import { IMessageDataWrapper } from '../../../../../api';

export class AchievementLevelUpData
{
    private _type: number;
    private _level: number;
    private _points: number;
    private _levelRewardPoints: number;
    private _levelRewardPointType: number;
    private _bonusPoints: number;
    private _badgeId: number;
    private _badgeCode: string = '';
    private _removedBadgeCode: string = '';
    private _achievementID: number;
    private _category: string;
    private _showDialogToUser: boolean;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._type = wrapper.readInt();
        this._level = wrapper.readInt();
        this._badgeId = wrapper.readInt();
        this._badgeCode = wrapper.readString();
        this._points = wrapper.readInt();
        this._levelRewardPoints = wrapper.readInt();
        this._levelRewardPointType = wrapper.readInt();
        this._bonusPoints = wrapper.readInt();
        this._achievementID = wrapper.readInt();
        this._removedBadgeCode = wrapper.readString();
        this._category = wrapper.readString();
        this._showDialogToUser = wrapper.readBoolean();
    }

    public get type(): number
    {
        return this._type;
    }

    public get level(): number
    {
        return this._level;
    }

    public get points(): number
    {
        return this._points;
    }

    public get levelRewardPoints(): number
    {
        return this._levelRewardPoints;
    }

    public get levelRewardPointType(): number
    {
        return this._levelRewardPointType;
    }

    public get bonusPoints(): number
    {
        return this._bonusPoints;
    }

    public get badgeId(): number
    {
        return this._badgeId;
    }

    public get badgeCode(): string
    {
        return this._badgeCode;
    }

    public get removedBadgeCode(): string
    {
        return this._removedBadgeCode;
    }

    public get achievementID(): number
    {
        return this._achievementID;
    }

    public get category(): string
    {
        return this._category;
    }

    public get showDialogToUser(): boolean
    {
        return this._showDialogToUser;
    }
}
