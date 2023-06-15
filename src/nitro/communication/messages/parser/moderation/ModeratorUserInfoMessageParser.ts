import { IMessageDataWrapper, IMessageParser } from '@/api'
import { ModeratorUserInfoData } from '@/nitro'

export class ModeratorUserInfoMessageParser implements IMessageParser {
  private _data: ModeratorUserInfoData

  public get data(): ModeratorUserInfoData {
    return this._data
  }

  public flush(): boolean {
    this._data = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._data = new ModeratorUserInfoData(wrapper)

    return true
  }
}
