import { IMessageDataWrapper, IMessageParser } from '@/api'
import { CatalogPageMessageOfferData } from '@/nitro'

export class ProductOfferMessageParser implements IMessageParser {
  private _offer: CatalogPageMessageOfferData

  public get offer(): CatalogPageMessageOfferData {
    return this._offer
  }

  public flush(): boolean {
    this._offer = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._offer = new CatalogPageMessageOfferData(wrapper)

    return true
  }
}
