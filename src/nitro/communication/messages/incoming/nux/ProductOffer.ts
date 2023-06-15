import { IMessageDataWrapper } from '@/api'

export class ProductOffer {
  constructor(wrapper: IMessageDataWrapper) {
    this._itemName = wrapper.readString()
    this._extraInfo = wrapper.readString()

    if (this._extraInfo == '') {
      this._extraInfo = null
    }
  }

  private _itemName: string

  public get itemName(): string {
    return this._itemName
  }

  private _extraInfo: string

  public get extraInfo(): string {
    return this._extraInfo
  }
}
