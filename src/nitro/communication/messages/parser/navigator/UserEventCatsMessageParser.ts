import { IMessageDataWrapper, IMessageParser } from '@/api'
import { NavigatorEventCategoryDataParser } from '@/nitro'

export class UserEventCatsMessageParser implements IMessageParser {
  private _categories: NavigatorEventCategoryDataParser[]

  public get categories(): NavigatorEventCategoryDataParser[] {
    return this._categories
  }

  public flush(): boolean {
    this._categories = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    let totalCategories = wrapper.readInt()

    while (totalCategories > 0) {
      this._categories.push(new NavigatorEventCategoryDataParser(wrapper))

      totalCategories--
    }

    return true
  }
}
