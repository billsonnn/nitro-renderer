import { IMessageDataWrapper, IMessageParser } from '@/api'

export class CurrentTimingCodeMessageParser implements IMessageParser {
  private _schedulingStr: string

  public get schedulingStr(): string {
    return this._schedulingStr
  }

  private _code: string

  public get code(): string {
    return this._code
  }

  public flush(): boolean {
    this._schedulingStr = null
    this._code = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    this._schedulingStr = wrapper.readString()
    this._code = wrapper.readString()

    return true
  }
}
