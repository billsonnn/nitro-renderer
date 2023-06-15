import { IMessageDataWrapper, IMessageParser } from '@/api'
import { IssueMessageData } from '@/nitro'

export class IssuePickFailedMessageParser implements IMessageParser {
  private _issues: IssueMessageData[]

  public get issues(): IssueMessageData[] {
    return this._issues
  }

  private _retryEnabled: boolean

  public get retryEnabled(): boolean {
    return this._retryEnabled
  }

  private _retryCount: number

  public get retryCount(): number {
    return this._retryCount
  }

  public flush(): boolean {
    this._issues = null
    return true
  }

  public parse(k: IMessageDataWrapper): boolean {
    this._issues = []

    const count = k.readInt()

    for (let i = 0; i < count; i++) {
      const _local_4 = k.readInt()
      const _local_5 = k.readInt()
      const _local_6 = k.readString()
      const _local_7 = new IssueMessageData(_local_4, 0, 0, 0, 0, 0, 0, 0, null, 0, null, _local_5, _local_6, null, 0, [])
      this._issues.push(_local_7)
    }

    this._retryEnabled = k.readBoolean()
    this._retryCount = k.readInt()
    return true
  }
}
