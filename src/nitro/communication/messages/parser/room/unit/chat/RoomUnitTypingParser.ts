import { IMessageDataWrapper, IMessageParser } from '@/api'

export class RoomUnitTypingParser implements IMessageParser {
  private _unitId: number

  public get unitId(): number {
    return this._unitId
  }

  private _isTyping: boolean

  public get isTyping(): boolean {
    return this._isTyping
  }

  public flush(): boolean {
    this._unitId = null
    this._isTyping = false

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._unitId = wrapper.readInt()
    this._isTyping = wrapper.readInt() === 1 ? true : false

    return true
  }
}
