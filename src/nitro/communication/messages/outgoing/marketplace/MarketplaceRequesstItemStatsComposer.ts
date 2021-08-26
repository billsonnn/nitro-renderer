import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class MarketplaceRequesstItemStatsComposer implements IMessageComposer<ConstructorParameters<typeof MarketplaceRequesstItemStatsComposer>>
{
    private _data: ConstructorParameters<typeof MarketplaceRequesstItemStatsComposer>;

    constructor(unknown: number, itemId: number)
    {
        this._data = [ unknown, itemId ];
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
