import { IMessageDataWrapper, IMessageParser } from '@/api'

export class CompetitionStatusMessageParser implements IMessageParser {
  private _ok: boolean = false

  public get ok(): boolean {
    return this._ok
  }

  private _errorReason: string = null

  public get errorReason(): string {
    return this._errorReason
  }

  public flush(): boolean {
    this._ok = false
    this._errorReason = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._ok = wrapper.readBoolean()
    this._errorReason = wrapper.readString()

    return true
  }
}
