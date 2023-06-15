import { IMessageDataWrapper, IMessageParser } from '@/api'

export class InfoFeedEnableMessageParser implements IMessageParser {
  private _enabled: boolean

  public get enabled(): boolean {
    return this._enabled
  }

  public flush(): boolean {
    this._enabled = false

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._enabled = wrapper.readBoolean()

    return true
  }
}
