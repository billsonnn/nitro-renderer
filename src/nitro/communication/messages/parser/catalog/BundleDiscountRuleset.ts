import { IMessageDataWrapper } from '@/api'

export class BundleDiscountRuleset {
  constructor(wrapper: IMessageDataWrapper) {
    this._maxPurchaseSize = wrapper.readInt()
    this._bundleSize = wrapper.readInt()
    this._bundleDiscountSize = wrapper.readInt()
    this._bonusThreshold = wrapper.readInt()
    this._additionalBonusDiscountThresholdQuantities = []

    let count = wrapper.readInt()

    while (count > 0) {
      this._additionalBonusDiscountThresholdQuantities.push(wrapper.readInt())

      count--
    }
  }

  private _maxPurchaseSize: number

  public get maxPurchaseSize(): number {
    return this._maxPurchaseSize
  }

  private _bundleSize: number

  public get bundleSize(): number {
    return this._bundleSize
  }

  private _bundleDiscountSize: number

  public get bundleDiscountSize(): number {
    return this._bundleDiscountSize
  }

  private _bonusThreshold: number

  public get bonusThreshold(): number {
    return this._bonusThreshold
  }

  private _additionalBonusDiscountThresholdQuantities: number[]

  public get additionalBonusDiscountThresholdQuantities(): number[] {
    return this._additionalBonusDiscountThresholdQuantities
  }
}
