import { IMessageDataWrapper, IMessageParser } from '@/api'
import { CatalogPageMessageProductData } from '@/nitro'

export class WeeklyGameRewardParser implements IMessageParser {
  private _gameTypeId: number

  public get gameTypeId(): number {
    return this._gameTypeId
  }

  private _products: CatalogPageMessageProductData[]

  public get products(): CatalogPageMessageProductData[] {
    return this._products
  }

  private _minutesUntilNextWeek: number

  public get minutesUntilNextWeek(): number {
    return this._minutesUntilNextWeek
  }

  private _rewardingOn: boolean

  public get rewardingOn(): boolean {
    return this._rewardingOn
  }

  public flush(): boolean {
    this._gameTypeId = -1
    this._products = []
    this._minutesUntilNextWeek = 0
    this._rewardingOn = true

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._gameTypeId = wrapper.readInt()
    let totalProducts: number = wrapper.readInt()

    while (totalProducts > 0) {
      this._products.push(new CatalogPageMessageProductData(wrapper))
      totalProducts--
    }

    this._minutesUntilNextWeek = wrapper.readInt()
    this._rewardingOn = wrapper.readBoolean()

    return true
  }
}
