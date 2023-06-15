import { IMessageDataWrapper } from '@/api'

export class CraftingRecipeIngredientParser {
  constructor(wrapper: IMessageDataWrapper) {
    this._count = wrapper.readInt()
    this._itemName = wrapper.readString()
  }

  private _count: number

  public get count(): number {
    return this._count
  }

  private _itemName: string

  public get itemName(): string {
    return this._itemName
  }
}
