import { IMessageDataWrapper } from '@/api'

export class PrizeData {
  constructor(k: IMessageDataWrapper) {
    this._communityGoalId = k.readInt()
    this._communityGoalCode = k.readString()
    this._userRank = k.readInt()
    this._rewardCode = k.readString()
    this._badge = k.readBoolean()
    this._localizedName = k.readString()
  }

  private _communityGoalId: number

  public get communityGoalId(): number {
    return this._communityGoalId
  }

  private _communityGoalCode: string

  public get communityGoalCode(): string {
    return this._communityGoalCode
  }

  private _userRank: number

  public get userRank(): number {
    return this._userRank
  }

  private _rewardCode: string

  public get rewardCode(): string {
    return this._rewardCode
  }

  private _badge: boolean

  public get badge(): boolean {
    return this._badge
  }

  private _localizedName: string

  public get localizedName(): string {
    return this._localizedName
  }
}
