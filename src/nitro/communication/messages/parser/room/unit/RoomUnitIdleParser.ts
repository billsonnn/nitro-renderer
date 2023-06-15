import { IMessageDataWrapper, IMessageParser } from '@/api'

export class RoomUnitIdleParser implements IMessageParser {
  private _unitId: number

  public get unitId(): number {
    return this._unitId
  }

  private _isIdle: boolean

  public get isIdle(): boolean {
    return this._isIdle
  }

  public flush(): boolean {
    this._unitId = null
    this._isIdle = false

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._unitId = wrapper.readInt()
    this._isIdle = wrapper.readBoolean()

    return true
  }
}
