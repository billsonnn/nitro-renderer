import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class MarketplaceRequestComposer implements IMessageComposer<ConstructorParameters<typeof MarketplaceRequestComposer>>
{
    private _data: ConstructorParameters<typeof MarketplaceRequestComposer>;

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
