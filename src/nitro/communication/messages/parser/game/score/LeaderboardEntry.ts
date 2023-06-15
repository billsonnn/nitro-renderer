import { IMessageDataWrapper } from '@/api'

export class LeaderboardEntry {
  constructor(k: IMessageDataWrapper) {
    this._userId = k.readInt()
    this._score = k.readInt()
    this._rank = k.readInt()
    this._name = k.readString()
    this._figure = k.readString()
    this._gender = k.readString()
  }

  private _userId: number

  public get userId(): number {
    return this._userId
  }

  private _score: number

  public get score(): number {
    return this._score
  }

  private _rank: number

  public get rank(): number {
    return this._rank
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
}
