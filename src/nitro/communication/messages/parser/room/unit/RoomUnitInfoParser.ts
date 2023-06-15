import { IMessageDataWrapper, IMessageParser } from '@/api'

export class RoomUnitInfoParser implements IMessageParser {
  private _unitId: number

  public get unitId(): number {
    return this._unitId
  }

  private _figure: string

  public get figure(): string {
    return this._figure
  }

  private _gender: string

  public get gender(): string {
    return this._gender
  }

  private _motto: string

  public get motto(): string {
    return this._motto
  }

  private _achievementScore: number

  public get achievementScore(): number {
    return this._achievementScore
  }

  public flush(): boolean {
    this._unitId = null
    this._figure = null
    this._gender = 'M'
    this._motto = null
    this._achievementScore = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._unitId = wrapper.readInt()
    this._figure = wrapper.readString()
    this._gender = wrapper.readString().toLocaleUpperCase()
    this._motto = wrapper.readString()
    this._achievementScore = wrapper.readInt()

    return true
  }
}
