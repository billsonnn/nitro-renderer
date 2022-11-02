import { IDisposable, IMessageDataWrapper } from '../../../../../api';

export class CommunityGoalData implements IDisposable
{
    private _hasGoalExpired: boolean;
    private _personalContributionScore: number;
    private _personalContributionRank: number;
    private _communityTotalScore: number;
    private _communityHighestAchievedLevel: number;
    private _scoreRemainingUntilNextLevel: number;
    private _percentCompletionTowardsNextLevel: number;
    private _goalCode: string;
    private _timeRemainingInSeconds: number;
    private _rewardUserLimits: number[];

    constructor(wrapper: IMessageDataWrapper)
    {
        this._rewardUserLimits = [];
        this._hasGoalExpired = wrapper.readBoolean();
        this._personalContributionScore = wrapper.readInt();
        this._personalContributionRank = wrapper.readInt();
        this._communityTotalScore = wrapper.readInt();
        this._communityHighestAchievedLevel = wrapper.readInt();
        this._scoreRemainingUntilNextLevel = wrapper.readInt();
        this._percentCompletionTowardsNextLevel = wrapper.readInt();
        this._goalCode = wrapper.readString();
        this._timeRemainingInSeconds = wrapper.readInt();

        const count = wrapper.readInt();
        for(let i = 0; i < count; i++)
        {
            this._rewardUserLimits.push(wrapper.readInt());
        }
    }

    public dispose(): void
    {
        this._rewardUserLimits = null;
    }

    public get disposed(): boolean
    {
        return this._rewardUserLimits == null;
    }

    public get hasGoalExpired(): boolean
    {
        return this._hasGoalExpired;
    }

    public get personalContributionScore(): number
    {
        return this._personalContributionScore;
    }

    public get personalContributionRank(): number
    {
        return this._personalContributionRank;
    }

    public get communityTotalScore(): number
    {
        return this._communityTotalScore;
    }

    public get communityHighestAchievedLevel(): number
    {
        return this._communityHighestAchievedLevel;
    }

    public get scoreRemainingUntilNextLevel(): number
    {
        return this._scoreRemainingUntilNextLevel;
    }

    public get percentCompletionTowardsNextLevel(): number
    {
        return this._percentCompletionTowardsNextLevel;
    }

    public get timeRemainingInSeconds(): number
    {
        return this._timeRemainingInSeconds;
    }

    public get rewardUserLimits(): number[]
    {
        return this._rewardUserLimits;
    }

    public get goalCode(): string
    {
        return this._goalCode;
    }
}
