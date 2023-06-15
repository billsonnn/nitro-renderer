import { IMessageDataWrapper, IMessageParser } from '@/api'

export class Game2WeeklyLeaderboardParser implements IMessageParser {
  private _year: number

  public get year(): number {
    return this._year
  }

  private _week: number

  public get week(): number {
    return this._week
  }

  private _maxOffset: number

  public get maxOffset(): number {
    return this._maxOffset
  }

  private _currentOffset: number

  public get currentOffset(): number {
    return this._currentOffset
  }

  private _minutesUntilReset: number

  public get minutesUntilReset(): number {
    return this._minutesUntilReset
  }

  public flush(): boolean {
    this._year = -1
    this._week = -1
    this._maxOffset = -1
    this._currentOffset = -1
    this._minutesUntilReset = -1

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._year = wrapper.readInt()
    this._week = wrapper.readInt()
    this._maxOffset = wrapper.readInt()
    this._currentOffset = wrapper.readInt()
    this._minutesUntilReset = wrapper.readInt()

    return true
  }
}
