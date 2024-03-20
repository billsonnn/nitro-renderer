import { IMessageComposer } from '@nitrots/api';

export class BuyMarketplaceOfferMessageComposer implements IMessageComposer<ConstructorParameters<typeof BuyMarketplaceOfferMessageComposer>>
{
    private _data: ConstructorParameters<typeof BuyMarketplaceOfferMessageComposer>;

    constructor(offerId: number)
    {
        this._data = [offerId];
    }

    public getMessageArray()
    {
        return this._data;
    }

    public dispose(): void
    {
        this._data = null;
    }
}
