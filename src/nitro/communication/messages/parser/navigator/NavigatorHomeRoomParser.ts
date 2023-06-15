import { IMessageDataWrapper, IMessageParser } from '@/api'

export class NavigatorHomeRoomParser implements IMessageParser {
  private _homeRoomId: number

  public get homeRoomId(): number {
    return this._homeRoomId
  }

  private _roomIdToEnter: number

  public get roomIdToEnter(): number {
    return this._roomIdToEnter
  }

  public flush(): boolean {
    this._homeRoomId = -1
    this._roomIdToEnter = -1

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._homeRoomId = wrapper.readInt()
    this._roomIdToEnter = wrapper.readInt()

    return true
  }
}
