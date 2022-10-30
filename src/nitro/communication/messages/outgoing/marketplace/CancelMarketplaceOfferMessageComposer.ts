import { IMessageComposer } from '../../../../../api';

export class CancelMarketplaceOfferMessageComposer implements IMessageComposer<ConstructorParameters<typeof CancelMarketplaceOfferMessageComposer>>
{
    private _data: ConstructorParameters<typeof CancelMarketplaceOfferMessageComposer>;

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
