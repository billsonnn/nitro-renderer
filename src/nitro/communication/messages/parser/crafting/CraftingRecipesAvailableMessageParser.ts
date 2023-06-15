import { IMessageDataWrapper, IMessageParser } from '@/api'

export class CraftingRecipesAvailableMessageParser implements IMessageParser {
  private _hasRecipes: boolean

  public get hasRecipes(): boolean {
    return this._hasRecipes
  }

  private _count: number

  public get count(): number {
    return this._count
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false
    this._count = wrapper.readInt()
    this._hasRecipes = wrapper.readBoolean()
    return true
  }

  public flush(): boolean {
    this._count = 0
    this._hasRecipes = false
    return true
  }
}
