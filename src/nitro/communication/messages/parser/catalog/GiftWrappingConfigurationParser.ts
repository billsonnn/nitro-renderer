import { IMessageDataWrapper, IMessageParser } from '@/api'

export class GiftWrappingConfigurationParser implements IMessageParser {
  private _isEnabled: boolean = false

  public get isEnabled(): boolean {
    return this._isEnabled
  }

  private _price: number = null

  public get price(): number {
    return this._price
  }

  private _giftWrappers: number[] = null

  public get giftWrappers(): number[] {
    return this._giftWrappers
  }

  private _boxTypes: number[] = null

  public get boxTypes(): number[] {
    return this._boxTypes
  }

  private _ribbonTypes: number[] = null

  public get ribbonTypes(): number[] {
    return this._ribbonTypes
  }

  private _giftFurnis: number[] = null

  public get giftFurnis(): number[] {
    return this._giftFurnis
  }

  public flush(): boolean {
    this._boxTypes = null
    this._giftFurnis = null
    this._giftWrappers = null
    this._ribbonTypes = null
    this._isEnabled = null
    this._price = null
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    const giftWrappers = []
    const boxTypes = []
    const ribbonTypes = []
    const giftFurnis = []
    this._isEnabled = wrapper.readBoolean()
    // hotel.gifts.special.price
    this._price = wrapper.readInt()


    let _local_3 = wrapper.readInt()

    let i = 0
    while (i < _local_3) {
      giftWrappers.push(wrapper.readInt())
      i++
    }

    _local_3 = wrapper.readInt()
    i = 0
    while (i < _local_3) {
      boxTypes.push(wrapper.readInt())
      i++
    }

    _local_3 = wrapper.readInt()
    i = 0
    while (i < _local_3) {
      ribbonTypes.push(wrapper.readInt())
      i++
    }

    _local_3 = wrapper.readInt()
    i = 0
    while (i < _local_3) {
      giftFurnis.push(wrapper.readInt())
      i++
    }

    this._giftWrappers = giftWrappers
    this._ribbonTypes = ribbonTypes
    this._giftFurnis = giftFurnis
    this._boxTypes = boxTypes
    return true
  }
}
