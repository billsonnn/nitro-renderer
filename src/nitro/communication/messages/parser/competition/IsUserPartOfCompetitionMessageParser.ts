import { IMessageDataWrapper, IMessageParser } from '@/api'

export class IsUserPartOfCompetitionMessageParser implements IMessageParser {
  private _isPartOf: boolean

  public get isPartOf(): boolean {
    return this._isPartOf
  }

  private _targetId: number

  public get targetId(): number {
    return this._targetId
  }

  public flush(): boolean {
    this._isPartOf = false
    this._targetId = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    this._isPartOf = wrapper.readBoolean()
    this._targetId = wrapper.readInt()

    return true
  }
}
