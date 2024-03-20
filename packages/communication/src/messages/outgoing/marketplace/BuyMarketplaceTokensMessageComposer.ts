import { IMessageComposer } from '@nitrots/api';

export class BuyMarketplaceTokensMessageComposer implements IMessageComposer<ConstructorParameters<typeof BuyMarketplaceTokensMessageComposer>>
{
    private _data: ConstructorParameters<typeof BuyMarketplaceTokensMessageComposer>;

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
