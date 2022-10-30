import { IMessageComposer } from '../../../../../api';

export class GetMarketplaceOwnOffersMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetMarketplaceOwnOffersMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetMarketplaceOwnOffersMessageComposer>;

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
