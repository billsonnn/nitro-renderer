import { IMessageDataWrapper } from '@/api'

export class CraftingResultObjectParser {
  constructor(wrapper: IMessageDataWrapper) {
    this._recipeName = wrapper.readString()
    this._itemName = wrapper.readString()
  }

  private _recipeName: string

  public get recipeName(): string {
    return this._recipeName
  }

  private _itemName: string

  public get itemName(): string {
    return this._itemName
  }
}
