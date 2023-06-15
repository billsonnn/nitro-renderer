import { IMessageDataWrapper, IMessageParser } from '@/api'
import { CraftingRecipeIngredientParser } from '@/nitro'

export class CraftingRecipeMessageParser implements IMessageParser {
  constructor() {
    this._ingredients = []
  }

  private _ingredients: CraftingRecipeIngredientParser[]

  public get ingredients(): CraftingRecipeIngredientParser[] {
    return this._ingredients
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false
    const ingredientCount = wrapper.readInt()
    for (let i = 0; i < ingredientCount; i++) {
      this._ingredients.push(new CraftingRecipeIngredientParser(wrapper))
    }
    return true
  }

  public flush(): boolean {
    this._ingredients = []
    return true
  }
}
