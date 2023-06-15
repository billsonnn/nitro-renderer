import { IMessageDataWrapper, IMessageParser } from '@/api'

export class IssueDeletedMessageParser implements IMessageParser {
  private _issueId: number

  public get issueId(): number {
    return this._issueId
  }

  public flush(): boolean {
    return true
  }

  public parse(k: IMessageDataWrapper): boolean {
    this._issueId = parseInt(k.readString())
    return true
  }
}
