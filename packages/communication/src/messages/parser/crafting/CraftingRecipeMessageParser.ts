import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { CraftingRecipeIngredientParser } from './CraftingRecipeIngredientParser';

export class CraftingRecipeMessageParser implements IMessageParser
{
    private _ingredients: CraftingRecipeIngredientParser[];

    constructor()
    {
        this._ingredients = [];
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;
        const ingredientCount = wrapper.readInt();
        for(let i = 0; i < ingredientCount; i++)
        {
            this._ingredients.push(new CraftingRecipeIngredientParser(wrapper));
        }
        return true;
    }

    public flush(): boolean
    {
        this._ingredients = [];
        return true;
    }

    public get ingredients(): CraftingRecipeIngredientParser[]
    {
        return this._ingredients;
    }
}
