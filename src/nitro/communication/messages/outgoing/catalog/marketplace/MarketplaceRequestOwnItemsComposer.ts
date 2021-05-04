import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class MarketplaceRequestOwnItemsComposer implements IMessageComposer<ConstructorParameters<typeof MarketplaceRequestOwnItemsComposer>>
{
    private _data: ConstructorParameters<typeof MarketplaceRequestOwnItemsComposer>;

    constructor()
    {
        this._data = [ ];
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
