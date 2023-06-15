import { IMessageDataWrapper, IMessageParser } from '@/api'

export class NavigatorCollapsedParser implements IMessageParser {
  private _categories: string[]

  public get categories(): string[] {
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
      this._categories.push(wrapper.readString())

      totalCategories--
    }

    return true
  }
}
