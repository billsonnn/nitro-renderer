import { IMessageComposer } from '@nitrots/api';

export class GetMarketplaceCanMakeOfferComposer implements IMessageComposer<ConstructorParameters<typeof GetMarketplaceCanMakeOfferComposer>>
{
    private _data: ConstructorParameters<typeof GetMarketplaceCanMakeOfferComposer>;

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
        return;
    }
}
