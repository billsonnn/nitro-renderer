import { IMessageDataWrapper, IMessageParser } from '@/api'

export class GroupPurchasedParser implements IMessageParser {
  private _groupId: number

  private _roomId: number

  public get roomId(): number {
    return this._roomId
  }

  public get guildId(): number {
    return this._groupId
  }

  flush(): boolean {
    this._roomId = 0
    this._groupId = 0

    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._roomId = wrapper.readInt()
    this._groupId = wrapper.readInt()

    return true
  }
}
