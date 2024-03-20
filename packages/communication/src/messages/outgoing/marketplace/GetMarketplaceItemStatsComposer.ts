import { IMessageComposer } from '@nitrots/api';

export class GetMarketplaceItemStatsComposer implements IMessageComposer<ConstructorParameters<typeof GetMarketplaceItemStatsComposer>>
{
    private _data: ConstructorParameters<typeof GetMarketplaceItemStatsComposer>;

    constructor(unknown: number, itemId: number)
    {
        this._data = [unknown, itemId];
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
