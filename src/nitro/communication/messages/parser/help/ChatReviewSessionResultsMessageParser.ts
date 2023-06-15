import { IMessageDataWrapper, IMessageParser } from '@/api'

export class ChatReviewSessionResultsMessageParser implements IMessageParser {
  private _winningVoteCode: number

  public get winningVoteCode(): number {
    return this._winningVoteCode
  }

  private _ownVoteCode: number

  public get ownVoteCode(): number {
    return this._ownVoteCode
  }

  private _finalStatus: number[]

  public get finalStatus(): number[] {
    return this._finalStatus
  }

  flush(): boolean {
    this._winningVoteCode = -1
    this._ownVoteCode = -1
    this._finalStatus = null
    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    this._finalStatus = []
    this._winningVoteCode = wrapper.readInt()
    this._ownVoteCode = wrapper.readInt()
    const count = wrapper.readInt()

    for (let i = 0; i < count; i++) {
      this._finalStatus.push(wrapper.readInt())
    }

    return true
  }

}
