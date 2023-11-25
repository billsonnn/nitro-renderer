import { IMessageComposer } from '../../../../../api';

export class ShopTargetedOfferViewedComposer implements IMessageComposer<ConstructorParameters<typeof ShopTargetedOfferViewedComposer>>
{
    private _data: ConstructorParameters<typeof ShopTargetedOfferViewedComposer>;

    constructor(offerId: number, offerTracking: number)
    {
        this._data = [offerId, offerTracking];
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
