import { IMessageDataWrapper, IMessageParser } from '@/api'
import { BundleDiscountRuleset } from '@/nitro'

export class BundleDiscountRulesetMessageParser implements IMessageParser {
  private _bundleDiscountRuleset: BundleDiscountRuleset

  public get bundleDiscountRuleset(): BundleDiscountRuleset {
    return this._bundleDiscountRuleset
  }

  public flush(): boolean {
    this._bundleDiscountRuleset = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._bundleDiscountRuleset = new BundleDiscountRuleset(wrapper)

    return true
  }
}
