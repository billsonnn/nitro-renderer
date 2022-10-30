import { IMessageDataWrapper } from '../../../../../api';

export class CraftingRecipeIngredientParser
{
    private _count: number;
    private _itemName: string;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._count = wrapper.readInt();
        this._itemName = wrapper.readString();
    }

    public get count(): number
    {
        return this._count;
    }

    public get itemName(): string
    {
        return this._itemName;
    }
}
