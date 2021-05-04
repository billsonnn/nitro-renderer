import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class MarketplaceBuyOfferComposer implements IMessageComposer<ConstructorParameters<typeof MarketplaceBuyOfferComposer>>
{
    private _data: ConstructorParameters<typeof MarketplaceBuyOfferComposer>;

    constructor(offerId: number)
    {
        this._data = [ offerId ];
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
