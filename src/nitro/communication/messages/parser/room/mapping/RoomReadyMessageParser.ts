import { IMessageDataWrapper, IMessageParser } from '@/api'

export class RoomReadyMessageParser implements IMessageParser {
  private _name: string

  public get name(): string {
    return this._name
  }

  private _roomId: number

  public get roomId(): number {
    return this._roomId
  }

  public flush(): boolean {
    this._name = null
    this._roomId = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._name = wrapper.readString()
    this._roomId = wrapper.readInt()

    return true
  }
}
