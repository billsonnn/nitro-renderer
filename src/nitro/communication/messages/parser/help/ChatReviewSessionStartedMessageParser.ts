import { IMessageDataWrapper, IMessageParser } from '@/api'

export class ChatReviewSessionStartedMessageParser implements IMessageParser {
  private _votingTimeout: number

  public get votingTimeout(): number {
    return this._votingTimeout
  }

  private _chatRecord: string

  public get chatRecord(): string {
    return this._chatRecord
  }

  flush(): boolean {
    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    this._votingTimeout = wrapper.readInt()
    this._chatRecord = wrapper.readString()
    return true
  }
}
