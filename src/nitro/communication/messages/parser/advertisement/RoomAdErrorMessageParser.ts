import { IMessageDataWrapper, IMessageParser } from '@/api'

export class RoomAdErrorMessageParser implements IMessageParser {
  private _errorCode: number

  public get errorCode(): number {
    return this._errorCode
  }

  private _filteredText: string

  public get filteredText(): string {
    return this._filteredText
  }

  public flush(): boolean {
    this._errorCode = 0
    this._filteredText = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._errorCode = wrapper.readInt()
    this._filteredText = wrapper.readString()

    return true
  }
}
