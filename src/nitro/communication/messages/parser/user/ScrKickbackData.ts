import { IMessageDataWrapper } from '@/api'

export class ScrKickbackData {
  constructor(k: IMessageDataWrapper) {
    this._currentHcStreak = k.readInt()
    this._firstSubscriptionDate = k.readString()
    this._kickbackPercentage = k.readDouble()
    this._totalCreditsMissed = k.readInt()
    this._totalCreditsRewarded = k.readInt()
    this._totalCreditsSpent = k.readInt()
    this._creditRewardForStreakBonus = k.readInt()
    this._creditRewardForMonthlySpent = k.readInt()
    this._timeUntilPayday = k.readInt()
  }

  private _currentHcStreak: number

  public get currentHcStreak(): number {
    return this._currentHcStreak
  }

  private _firstSubscriptionDate: string

  public get firstSubscriptionDate(): string {
    return this._firstSubscriptionDate
  }

  private _kickbackPercentage: number

  public get kickbackPercentage(): number {
    return this._kickbackPercentage
  }

  private _totalCreditsMissed: number

  public get totalCreditsMissed(): number {
    return this._totalCreditsMissed
  }

  private _totalCreditsRewarded: number

  public get totalCreditsRewarded(): number {
    return this._totalCreditsRewarded
  }

  private _totalCreditsSpent: number

  public get totalCreditsSpent(): number {
    return this._totalCreditsSpent
  }

  private _creditRewardForStreakBonus: number

  public get creditRewardForStreakBonus(): number {
    return this._creditRewardForStreakBonus
  }

  private _creditRewardForMonthlySpent: number

  public get creditRewardForMonthlySpent(): number {
    return this._creditRewardForMonthlySpent
  }

  private _timeUntilPayday: number

  public get timeUntilPayday(): number {
    return this._timeUntilPayday
  }
}
