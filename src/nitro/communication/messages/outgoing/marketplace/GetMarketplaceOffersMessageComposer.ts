import { IMessageComposer } from '../../../../../api';

export class GetMarketplaceOffersMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetMarketplaceOffersMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetMarketplaceOffersMessageComposer>;

    constructor(min: number, max: number, query: string, type: number)
    {
        this._data = [min, max, query, type];
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
