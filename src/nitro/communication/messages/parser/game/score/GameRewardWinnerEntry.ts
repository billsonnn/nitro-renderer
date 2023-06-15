import { IMessageDataWrapper } from '@/api'

export class GameRewardWinnerEntry {
  constructor(wrapper: IMessageDataWrapper) {
    this._name = wrapper.readString()
    this._figure = wrapper.readString()
    this._gender = wrapper.readString()
    this._rank = wrapper.readInt()
    this._score = wrapper.readInt()
  }

  private _name: string

  public get name(): string {
    return this._name
  }

  private _figure: string

  public get figure(): string {
    return this._figure
  }

  private _gender: string

  public get gender(): string {
    return this._gender
  }

  private _rank: number

  public get rank(): number {
    return this._rank
  }

  private _score: number

  public get score(): number {
    return this._score
  }
}
