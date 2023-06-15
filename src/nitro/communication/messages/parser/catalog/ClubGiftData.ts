import { IMessageDataWrapper } from '@/api'

export class ClubGiftData {
  constructor(wrapper: IMessageDataWrapper) {
    this._offerId = wrapper.readInt()
    this._isVip = wrapper.readBoolean()
    this._daysRequired = wrapper.readInt()
    this._isSelectable = wrapper.readBoolean()
  }

  private _offerId: number

  public get offerId(): number {
    return this._offerId
  }

  private _isVip: boolean

  public get isVip(): boolean {
    return this._isVip
  }

  private _isSelectable: boolean

  public get isSelectable(): boolean {
    return this._isSelectable
  }

  private _daysRequired: number

  public get daysRequired(): number {
    return this._daysRequired
  }
}
