import { IMessageComposer } from '@nitrots/api';

export class RedeemMarketplaceOfferCreditsMessageComposer implements IMessageComposer<ConstructorParameters<typeof RedeemMarketplaceOfferCreditsMessageComposer>>
{
    private _data: ConstructorParameters<typeof RedeemMarketplaceOfferCreditsMessageComposer>;

    constructor()
    {
        this._data = [];
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
