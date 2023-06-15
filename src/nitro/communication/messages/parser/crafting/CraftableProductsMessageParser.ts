import { IMessageDataWrapper, IMessageParser } from '@/api'
import { CraftingResultObjectParser } from '@/nitro'

export class CraftableProductsMessageParser implements IMessageParser {
  constructor() {
    this._recipes = []
    this._ingredients = []
  }

  private _recipes: CraftingResultObjectParser[]

  public get recipes(): CraftingResultObjectParser[] {
    return this._recipes
  }

  private _ingredients: string[]

  public get ingredients(): string[] {
    return this._ingredients
  }

  public flush(): boolean {
    this._recipes = []
    this._ingredients = []
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false
    const craftingResultCount = wrapper.readInt()
    for (let i = 0; i < craftingResultCount; i++) {
      this._recipes.push(new CraftingResultObjectParser(wrapper))
    }
    const ingredientCount = wrapper.readInt()
    for (let i = 0; i < ingredientCount; i++) {
      this._ingredients.push(wrapper.readString())
    }
    return true
  }

  public isActive(): boolean {
    return (this._recipes.length > 0) || (this._ingredients.length > 0)
  }
}
