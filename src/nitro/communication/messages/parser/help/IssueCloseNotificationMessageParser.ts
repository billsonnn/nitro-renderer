import { IMessageDataWrapper, IMessageParser } from '@/api'

export class IssueCloseNotificationMessageParser implements IMessageParser {
  private _closeReason: number

  public get closeReason(): number {
    return this._closeReason
  }

  private _messageText: string

  public get messageText(): string {
    return this._messageText
  }

  public flush(): boolean {
    this._closeReason = 0
    this._messageText = ''
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._closeReason = wrapper.readInt()
    this._messageText = wrapper.readString()

    return true
  }
}
