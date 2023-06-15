import { IMessageDataWrapper, IMessageParser } from '@/api'

export class RecyclerStatusMessageParser implements IMessageParser {
  private _recyclerStatus: number

  public get recyclerStatus(): number {
    return this._recyclerStatus
  }

  private _recyclerTimeoutSeconds: number

  public get recyclerTimeoutSeconds(): number {
    return this._recyclerTimeoutSeconds
  }

  public flush(): boolean {
    this._recyclerStatus = -1
    this._recyclerTimeoutSeconds = 0
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._recyclerStatus = wrapper.readInt()
    this._recyclerTimeoutSeconds = wrapper.readInt()

    return true
  }
}
