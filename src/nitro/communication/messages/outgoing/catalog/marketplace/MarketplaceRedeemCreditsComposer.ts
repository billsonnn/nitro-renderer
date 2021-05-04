import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class MarketplaceRedeemCreditsComposer implements IMessageComposer<ConstructorParameters<typeof MarketplaceRedeemCreditsComposer>>
{
    private _data: ConstructorParameters<typeof MarketplaceRedeemCreditsComposer>;

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
