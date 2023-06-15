import { IMessageDataWrapper, IMessageParser } from '@/api'

export class BonusRareInfoMessageParser implements IMessageParser {
  private _productType: string

  public get productType(): string {
    return this._productType
  }

  private _productClassId: number

  public get productClassId(): number {
    return this._productClassId
  }

  private _totalCoinsForBonus: number

  public get totalCoinsForBonus(): number {
    return this._totalCoinsForBonus
  }

  private _coinsStillRequiredToBuy: number

  public get coinsStillRequiredToBuy(): number {
    return this._coinsStillRequiredToBuy
  }

  public flush(): boolean {
    this._totalCoinsForBonus = -1
    this._coinsStillRequiredToBuy = -1
    this._productType = ''
    this._productClassId = -1
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._productType = wrapper.readString()
    this._productClassId = wrapper.readInt()
    this._totalCoinsForBonus = wrapper.readInt()
    this._coinsStillRequiredToBuy = wrapper.readInt()
    return true
  }
}
