import { IMessageDataWrapper } from '@nitrots/api';

export class ScrKickbackData
{
    private _currentHcStreak: number;
    private _firstSubscriptionDate: string;
    private _kickbackPercentage: number;
    private _totalCreditsMissed: number;
    private _totalCreditsRewarded: number;
    private _totalCreditsSpent: number;
    private _creditRewardForStreakBonus: number;
    private _creditRewardForMonthlySpent: number;
    private _timeUntilPayday: number;

    constructor(k: IMessageDataWrapper)
    {
        this._currentHcStreak = k.readInt();
        this._firstSubscriptionDate = k.readString();
        this._kickbackPercentage = k.readDouble();
        this._totalCreditsMissed = k.readInt();
        this._totalCreditsRewarded = k.readInt();
        this._totalCreditsSpent = k.readInt();
        this._creditRewardForStreakBonus = k.readInt();
        this._creditRewardForMonthlySpent = k.readInt();
        this._timeUntilPayday = k.readInt();
    }

    public get currentHcStreak(): number
    {
        return this._currentHcStreak;
    }

    public get firstSubscriptionDate(): string
    {
        return this._firstSubscriptionDate;
    }

    public get kickbackPercentage(): number
    {
        return this._kickbackPercentage;
    }

    public get totalCreditsMissed(): number
    {
        return this._totalCreditsMissed;
    }

    public get totalCreditsRewarded(): number
    {
        return this._totalCreditsRewarded;
    }

    public get totalCreditsSpent(): number
    {
        return this._totalCreditsSpent;
    }

    public get creditRewardForStreakBonus(): number
    {
        return this._creditRewardForStreakBonus;
    }

    public get creditRewardForMonthlySpent(): number
    {
        return this._creditRewardForMonthlySpent;
    }

    public get timeUntilPayday(): number
    {
        return this._timeUntilPayday;
    }
}
