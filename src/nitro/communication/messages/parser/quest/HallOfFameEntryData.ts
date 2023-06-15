import { IMessageDataWrapper } from '@/api'
import { ILandingPageUserEntry } from '@/nitro'

export class HallOfFameEntryData implements ILandingPageUserEntry {
  constructor(wrapper: IMessageDataWrapper) {
    this._userId = wrapper.readInt()
    this._userName = wrapper.readString()
    this._figure = wrapper.readString()
    this._rank = wrapper.readInt()
    this._currentScore = wrapper.readInt()
  }

  private _userId: number

  public get userId(): number {
    return this._userId
  }

  private _userName: string

  public get userName(): string {
    return this._userName
  }

  private _figure: string

  public get figure(): string {
    return this._figure
  }

  private _rank: number

  public get rank(): number {
    return this._rank
  }

  private _currentScore: number

  public get currentScore(): number {
    return this._currentScore
  }
}
