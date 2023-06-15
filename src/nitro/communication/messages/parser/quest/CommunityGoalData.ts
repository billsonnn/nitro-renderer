import { IDisposable, IMessageDataWrapper } from '@/api'

export class CommunityGoalData implements IDisposable {
  constructor(wrapper: IMessageDataWrapper) {
    this._rewardUserLimits = []
    this._hasGoalExpired = wrapper.readBoolean()
    this._personalContributionScore = wrapper.readInt()
    this._personalContributionRank = wrapper.readInt()
    this._communityTotalScore = wrapper.readInt()
    this._communityHighestAchievedLevel = wrapper.readInt()
    this._scoreRemainingUntilNextLevel = wrapper.readInt()
    this._percentCompletionTowardsNextLevel = wrapper.readInt()
    this._goalCode = wrapper.readString()
    this._timeRemainingInSeconds = wrapper.readInt()

    const count = wrapper.readInt()
    for (let i = 0; i < count; i++) {
      this._rewardUserLimits.push(wrapper.readInt())
    }
  }

  private _hasGoalExpired: boolean

  public get hasGoalExpired(): boolean {
    return this._hasGoalExpired
  }

  private _personalContributionScore: number

  public get personalContributionScore(): number {
    return this._personalContributionScore
  }

  private _personalContributionRank: number

  public get personalContributionRank(): number {
    return this._personalContributionRank
  }

  private _communityTotalScore: number

  public get communityTotalScore(): number {
    return this._communityTotalScore
  }

  private _communityHighestAchievedLevel: number

  public get communityHighestAchievedLevel(): number {
    return this._communityHighestAchievedLevel
  }

  private _scoreRemainingUntilNextLevel: number

  public get scoreRemainingUntilNextLevel(): number {
    return this._scoreRemainingUntilNextLevel
  }

  private _percentCompletionTowardsNextLevel: number

  public get percentCompletionTowardsNextLevel(): number {
    return this._percentCompletionTowardsNextLevel
  }

  private _goalCode: string

  public get goalCode(): string {
    return this._goalCode
  }

  private _timeRemainingInSeconds: number

  public get timeRemainingInSeconds(): number {
    return this._timeRemainingInSeconds
  }

  private _rewardUserLimits: number[]

  public get rewardUserLimits(): number[] {
    return this._rewardUserLimits
  }

  public get disposed(): boolean {
    return this._rewardUserLimits == null
  }

  public dispose(): void {
    this._rewardUserLimits = null
  }
}
