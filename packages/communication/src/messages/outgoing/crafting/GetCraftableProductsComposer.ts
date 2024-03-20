import { IMessageComposer } from '@nitrots/api';

export class GetCraftableProductsComposer implements IMessageComposer<ConstructorParameters<typeof GetCraftableProductsComposer>>
{
    private _data: ConstructorParameters<typeof GetCraftableProductsComposer>;

    constructor(k: number)
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
