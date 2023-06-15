import { IMessageDataWrapper, IMessageParser } from '@/api'
import { UserInfoDataParser } from '@/nitro'

export class UserInfoParser implements IMessageParser {
  private _userInfo: UserInfoDataParser

  public get userInfo(): UserInfoDataParser {
    return this._userInfo
  }

  public flush(): boolean {
    this._userInfo = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._userInfo = new UserInfoDataParser(wrapper)

    if (!this._userInfo) return false

    return true
  }
}
