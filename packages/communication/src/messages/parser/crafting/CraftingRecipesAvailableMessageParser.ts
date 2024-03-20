import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class CraftingRecipesAvailableMessageParser implements IMessageParser
{
    private _hasRecipes: boolean;
    private _count: number;

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;
        this._count = wrapper.readInt();
        this._hasRecipes = wrapper.readBoolean();
        return true;
    }

    public flush(): boolean
    {
        this._count = 0;
        this._hasRecipes = false;
        return true;
    }

    public get count(): number
    {
        return this._count;
    }

    public get hasRecipes(): boolean
    {
        return this._hasRecipes;
    }
}
