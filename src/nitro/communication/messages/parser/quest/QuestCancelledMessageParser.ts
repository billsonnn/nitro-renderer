import { IMessageDataWrapper, IMessageParser } from '@/api'

export class QuestCancelledMessageParser implements IMessageParser {
  private _expired: boolean

  public get expired(): boolean {
    return this._expired
  }

  public flush(): boolean {
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._expired = wrapper.readBoolean()
    return true
  }
}
