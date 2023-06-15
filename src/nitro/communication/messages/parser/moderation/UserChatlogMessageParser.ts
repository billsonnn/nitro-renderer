import { IMessageDataWrapper, IMessageParser } from '@/api'
import { UserChatlogData } from '@/nitro'

export class UserChatlogMessageParser implements IMessageParser {
  private _data: UserChatlogData

  public get data(): UserChatlogData {
    return this._data
  }

  public flush(): boolean {
    this._data = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._data = new UserChatlogData(wrapper)

    return true
  }
}
