import { IMessageDataWrapper, IMessageParser } from '@/api'

export class MarketplaceItemStatsParser implements IMessageParser {
  private _currentOfferCount: number

  private _averagePrice: number

  public get averagePrice(): number {
    return this._averagePrice
  }

  private _historyLength: number

  public get historyLength(): number {
    return this._historyLength
  }

  private _dayOffsets: number[]

  public get dayOffsets(): number[] {
    return this._dayOffsets
  }

  private _averagePrices: number[]

  public get averagePrices(): number[] {
    return this._averagePrices
  }

  private _soldAmounts: number[]

  public get soldAmounts(): number[] {
    return this._soldAmounts
  }

  private _furniTypeId: number

  public get furniTypeId(): number {
    return this._furniTypeId
  }

  private _furniCategoryId: number

  public get furniCategoryId(): number {
    return this._furniCategoryId
  }

  public get offerCount(): number {
    return this._currentOfferCount
  }

  public flush(): boolean {
    this._averagePrice = 0
    this._currentOfferCount = 0
    this._historyLength = 0
    this._dayOffsets = []
    this._averagePrices = []
    this._soldAmounts = []
    this._furniTypeId = 0
    this._furniCategoryId = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._averagePrice = wrapper.readInt()
    this._currentOfferCount = wrapper.readInt()
    this._historyLength = wrapper.readInt()

    let count = wrapper.readInt()

    while (count > 0) {
      this._dayOffsets.push(wrapper.readInt())
      this._averagePrices.push(wrapper.readInt())
      this._soldAmounts.push(wrapper.readInt())

      count--
    }

    this._furniCategoryId = wrapper.readInt()
    this._furniTypeId = wrapper.readInt()

    return true
  }
}
