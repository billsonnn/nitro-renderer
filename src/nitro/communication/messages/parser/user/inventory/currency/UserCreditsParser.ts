import { IMessageDataWrapper, IMessageParser } from '@/api'

export class UserCreditsParser implements IMessageParser {
  private _credits: string

  public get credits(): string {
    return this._credits
  }

  public flush(): boolean {
    this._credits = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._credits = wrapper.readString()

    return true
  }
}
