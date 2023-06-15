import { IMessageDataWrapper, IMessageParser } from '@/api'
import { FriendRequestData } from '@/nitro'

export class NewFriendRequestParser implements IMessageParser {
  private _request: FriendRequestData

  public get request(): FriendRequestData {
    return this._request
  }

  public flush(): boolean {
    this._request = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._request = new FriendRequestData(wrapper)

    return true
  }
}
