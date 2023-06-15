import { IMessageDataWrapper, IMessageParser } from '@/api'
import { CfhChatlogData } from '@/nitro'

export class CfhChatlogMessageParser implements IMessageParser {
  private _data: CfhChatlogData

  public get data(): CfhChatlogData {
    return this._data
  }

  public flush(): boolean {
    this._data = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._data = new CfhChatlogData(wrapper)

    return true
  }
}
