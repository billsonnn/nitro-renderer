import { IMessageDataWrapper, IMessageParser } from '@/api'
import { CompetitionVotingInfoResult } from '@/nitro'

export class CompetitionVotingInfoMessageParser implements IMessageParser {
  private _goalId: number

  public get goalId(): number {
    return this._goalId
  }

  private _goalCode: string

  public get goalCode(): string {
    return this._goalCode
  }

  private _resultCode: number

  public get resultCode(): number {
    return this._resultCode
  }

  private _votesRemaining: number

  public get votesRemaining(): number {
    return this._votesRemaining
  }

  public get isVotingAllowedForUser(): boolean {
    return (this._resultCode === CompetitionVotingInfoResult.ALLOWED)
  }

  public flush(): boolean {
    this._goalId = 0
    this._goalCode = null
    this._resultCode = 0
    this._votesRemaining = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    this._goalId = wrapper.readInt()
    this._goalCode = wrapper.readString()
    this._resultCode = wrapper.readInt()
    this._votesRemaining = wrapper.readInt()

    return true
  }
}
