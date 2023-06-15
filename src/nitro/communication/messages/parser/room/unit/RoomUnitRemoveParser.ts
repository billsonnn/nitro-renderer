import { IMessageDataWrapper, IMessageParser } from '@/api'

export class RoomUnitRemoveParser implements IMessageParser {
  private _unitId: number

  public get unitId(): number {
    return this._unitId
  }

  public flush(): boolean {
    this._unitId = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._unitId = parseInt(wrapper.readString())

    return true
  }
}
