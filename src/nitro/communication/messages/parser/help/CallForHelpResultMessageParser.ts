import { IMessageDataWrapper, IMessageParser } from '@/api'

export class CallForHelpResultMessageParser implements IMessageParser {
  private _resultType: number

  public get resultType(): number {
    return this._resultType
  }

  private _messageText: string

  public get messageText(): string {
    return this._messageText
  }

  public flush(): boolean {
    this._resultType = 0
    this._messageText = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._resultType = wrapper.readInt()
    this._messageText = wrapper.readString()

    return true
  }
}
