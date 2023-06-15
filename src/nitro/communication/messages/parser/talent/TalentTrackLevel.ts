import { TalentTrackRewardProduct } from '@/nitro'
import { TalentTrackTask } from '@/nitro'

export class TalentTrackLevel {
  private _rewardPerks: string[]
  private _rewardProducts: TalentTrackRewardProduct[]

  constructor(level: number, state: number, achievements: TalentTrackTask[], perks: string[], items: TalentTrackRewardProduct[]) {
    this._level = level
    this._state = state
    this._tasks = achievements
    this._rewardPerks = perks
    this._rewardProducts = items
  }

  private _level: number

  public get level(): number {
    return this._level
  }

  private _state: number

  public get state(): number {
    return this._state
  }

  private _tasks: TalentTrackTask[]

  public get tasks(): TalentTrackTask[] {
    return this._tasks
  }

  public get perks(): string[] {
    return this._rewardPerks
  }

  public get items(): TalentTrackRewardProduct[] {
    return this._rewardProducts
  }
}
