import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class CatalogPurchaseComposer implements IMessageComposer<ConstructorParameters<typeof CatalogPurchaseComposer>>
{
    private _data: ConstructorParameters<typeof CatalogPurchaseComposer>;

    constructor(pageId: number, offerId: number, extraData: string, amount: number)
    {
        this._data = [ pageId, offerId, extraData, amount ];
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