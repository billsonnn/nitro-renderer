import { IMessageDataWrapper, IMessageParser } from '@/api'
import { CatalogPageMessageProductData } from '@/nitro'

export class ClubGiftSelectedParser implements IMessageParser {
  private _productCode: string

  public get productCode(): string {
    return this._productCode
  }

  private _products: CatalogPageMessageProductData[]

  public get products(): CatalogPageMessageProductData[] {
    return this._products
  }

  public flush(): boolean {
    this._productCode = null
    this._products = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._productCode = wrapper.readString()

    let count = wrapper.readInt()

    while (count > 0) {
      this._products.push(new CatalogPageMessageProductData(wrapper))

      count--
    }

    return true
  }
}
