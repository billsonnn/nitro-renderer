import { IMessageDataWrapper } from '@nitrots/api';

export class AchievementResolutionData
{
    public static STATE_SELECTABLE: number = 0;

    private _achievementId: number;
    private _level: number;
    private _badgeId: string;
    private _requiredLevel: number;
    private _state: number;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._achievementId = wrapper.readInt();
        this._level = wrapper.readInt();
        this._badgeId = wrapper.readString();
        this._requiredLevel = wrapper.readInt();
        this._state = wrapper.readInt();
    }

    public dispose(): void
    {
        this._achievementId = 0;
        this._level = 0;
        this._badgeId = '';
        this._requiredLevel = 0;
    }

    public get achievementId(): number
    {
        return this._achievementId;
    }

    public get level(): number
    {
        return this._level;
    }

    public get badgeId(): string
    {
        return this._badgeId;
    }

    public get requiredLevel(): number
    {
        return this._requiredLevel;
    }

    public get enabled(): boolean
    {
        return (this._state === AchievementResolutionData.STATE_SELECTABLE);
    }

    public get state(): number
    {
        return this._state;
    }
}
