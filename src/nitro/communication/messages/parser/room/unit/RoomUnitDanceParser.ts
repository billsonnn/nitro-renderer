import { IMessageDataWrapper, IMessageParser } from '@/api'

export class RoomUnitDanceParser implements IMessageParser {
  private _unitId: number

  public get unitId(): number {
    return this._unitId
  }

  private _danceId: number

  public get danceId(): number {
    return this._danceId
  }

  public flush(): boolean {
    this._unitId = null
    this._danceId = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._unitId = wrapper.readInt()
    this._danceId = wrapper.readInt()

    return true
  }
}
