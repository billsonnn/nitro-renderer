import { IMessageDataWrapper, IMessageParser } from '@/api'
import { CallForHelpCategoryData } from '@/nitro'

export class CfhTopicsInitMessageParser implements IMessageParser {
  private _callForHelpCategories: CallForHelpCategoryData[]

  public get callForHelpCategories(): CallForHelpCategoryData[] {
    return this._callForHelpCategories
  }

  public flush(): boolean {
    this._callForHelpCategories = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._callForHelpCategories = []

    let count = wrapper.readInt()

    while (count > 0) {
      this._callForHelpCategories.push(new CallForHelpCategoryData(wrapper))

      count--
    }

    return true
  }
}
