import { IMessageDataWrapper, IMessageParser } from '@/api'

export class FavoriteMembershipUpdateMessageParser implements IMessageParser {
  private _roomIndex: number

  public get roomIndex(): number {
    return this._roomIndex
  }

  private _groupId: number

  public get groupId(): number {
    return this._groupId
  }

  private _status: number

  public get status(): number {
    return this._status
  }

  private _groupName: string

  public get groupName(): string {
    return this._groupName
  }

  public flush(): boolean {
    this._roomIndex = -1
    this._groupId = -1
    this._status = 0
    this._groupName = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._roomIndex = wrapper.readInt()
    this._groupId = wrapper.readInt()
    this._status = wrapper.readInt()
    this._groupName = wrapper.readString()

    return true
  }
}
