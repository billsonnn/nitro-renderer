import { IMessageComposer } from '../../../../../api';

export class GetMarketplaceItemStatsComposer implements IMessageComposer<ConstructorParameters<typeof GetMarketplaceItemStatsComposer>>
{
    private _data: ConstructorParameters<typeof GetMarketplaceItemStatsComposer>;

    constructor(itemType: number, itemId: number)
    {
        this._data = [itemType, itemId];
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
