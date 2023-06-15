import { IMessageDataWrapper, IMessageParser } from '@/api'

export class InClientLinkParser implements IMessageParser {
  private _link: string

  public get link(): string {
    return this._link
  }

  public flush(): boolean {
    this._link = null
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._link = wrapper.readString()
    return true
  }
}
