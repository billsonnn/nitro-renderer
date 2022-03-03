import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class GetCraftingRecipeComposer implements IMessageComposer<ConstructorParameters<typeof GetCraftingRecipeComposer>>
{
    private _data: ConstructorParameters<typeof GetCraftingRecipeComposer>;

    constructor(k: string)
    {
        this._data = [k];
    }

    public getMessageArray()
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }
}
