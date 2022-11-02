import { IMessageDataWrapper } from '../../../../../../api';

export class AchievementData
{
    public static DISPLAY_METHOD_OBSOLETE: number = -1;
    public static DISPLAY_METHOD_SHOW_LEVEL_PROGRESS: number = 0;
    public static DISPLAY_METHOD_NEVER_SHOW_PROGRESS: number = 1;
    public static DISPLAY_METHOD_SHOW_TOTAL_PROGRESS: number = 2;

    private _achievementId: number;
    private _level: number;
    private _badgeId: string;
    private _scoreAtStartOfLevel: number;
    private _scoreLimit: number;
    private _levelRewardPoints: number;
    private _levelRewardPointType: number;
    private _currentPoints: number;
    private _finalLevel: boolean;
    private _category: string;
    private _subCategory: string;
    private _levelCount: number;
    private _displayMethod: number;

    private _unseen: number = 0;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_parser');

        this._achievementId = wrapper.readInt();
        this._level = wrapper.readInt();
        this._badgeId = wrapper.readString();
        this._scoreAtStartOfLevel = wrapper.readInt();
        this._scoreLimit = Math.max(1, wrapper.readInt());
        this._levelRewardPoints = wrapper.readInt();
        this._levelRewardPointType = wrapper.readInt();
        this._currentPoints = wrapper.readInt();
        this._finalLevel = wrapper.readBoolean();
        this._category = wrapper.readString();
        this._subCategory = wrapper.readString();
        this._levelCount = wrapper.readInt();
        this._displayMethod = wrapper.readInt();
    }

    public get achievementId(): number
    {
        return this._achievementId;
    }

    public get badgeId(): string
    {
        return this._badgeId;
    }

    public get level(): number
    {
        return this._level;
    }

    public get scoreAtStartOfLevel(): number
    {
        return this._scoreAtStartOfLevel;
    }

    public get scoreLimit(): number
    {
        return (this._scoreLimit - this._scoreAtStartOfLevel);
    }

    public get levelRewardPoints(): number
    {
        return this._levelRewardPoints;
    }

    public get levelRewardPointType(): number
    {
        return this._levelRewardPointType;
    }

    public get currentPoints(): number
    {
        return (this._currentPoints - this._scoreAtStartOfLevel);
    }

    public get finalLevel(): boolean
    {
        return this._finalLevel;
    }

    public get category(): string
    {
        return this._category;
    }

    public get subCategory(): string
    {
        return this._subCategory;
    }

    public get levelCount(): number
    {
        return this._levelCount;
    }

    public get firstLevelAchieved(): boolean
    {
        return (this._level > 1) || (this._finalLevel);
    }

    public setMaxProgress(): void
    {
        this._currentPoints = this._scoreLimit;
    }

    public get displayMethod(): number
    {
        return this._displayMethod;
    }

    public get progress(): number
    {
        return this._currentPoints;
    }

    public get toNextProgress(): number
    {
        return this._scoreLimit;
    }

    public set unseen(unseen: number)
    {
        this._unseen = unseen;
    }

    public get unseen(): number
    {
        return this._unseen;
    }

    public reset(badge: AchievementData)
    {
        this._achievementId = badge._achievementId;
        this._level = badge._level;
        this._badgeId = badge._badgeId;
        this._scoreAtStartOfLevel = badge._scoreAtStartOfLevel;
        this._scoreLimit = badge._scoreLimit;
        this._levelRewardPoints = badge._levelRewardPoints;
        this._levelRewardPointType = badge._levelRewardPointType;
        this._currentPoints = badge._currentPoints;
        this._finalLevel = badge._finalLevel;
        this._category = badge.category;
        this._subCategory = badge._subCategory;
        this._levelCount = badge._levelCount;
        this._displayMethod = badge._displayMethod;
    }
}
