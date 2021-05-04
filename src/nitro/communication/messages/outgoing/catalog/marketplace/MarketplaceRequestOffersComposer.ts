import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class MarketplaceRequestOffersComposer implements IMessageComposer<ConstructorParameters<typeof MarketplaceRequestOffersComposer>>
{
    private _data: ConstructorParameters<typeof MarketplaceRequestOffersComposer>;

    constructor(min: number, max: number, query: string, type: number)
    {
        this._data = [ min, max, query, type ];
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
