import { IMessageDataWrapper, IMessageParser } from '@/api'

export class ConvertedRoomIdMessageParser implements IMessageParser {
  private _globalId: string

  public get globalId(): string {
    return this._globalId
  }

  private _convertedId: number

  public get convertedId(): number {
    return this._convertedId
  }

  public flush(): boolean {
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._globalId = wrapper.readString()
    this._convertedId = wrapper.readInt()

    return true
  }
}
