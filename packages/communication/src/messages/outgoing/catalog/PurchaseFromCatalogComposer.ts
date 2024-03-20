import { IMessageComposer } from '@nitrots/api';

export class PurchaseFromCatalogComposer implements IMessageComposer<ConstructorParameters<typeof PurchaseFromCatalogComposer>>
{
    private _data: ConstructorParameters<typeof PurchaseFromCatalogComposer>;

    constructor(pageId: number, offerId: number, extraData: string, amount: number)
    {
        this._data = [pageId, offerId, extraData, amount];
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
