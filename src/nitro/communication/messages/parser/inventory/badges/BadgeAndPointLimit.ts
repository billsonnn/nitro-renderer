import { IMessageDataWrapper } from '@/api'

export class BadgeAndPointLimit {
  constructor(k: string, _arg_2: IMessageDataWrapper) {
    if (!_arg_2) throw new Error('invalid_parser')

    this._badgeId = (('ACH_' + k) + _arg_2.readInt())
    this._limit = _arg_2.readInt()
  }

  private _badgeId: string

  public get badgeId(): string {
    return this._badgeId
  }

  private _limit: number

  public get limit(): number {
    return this._limit
  }
}
