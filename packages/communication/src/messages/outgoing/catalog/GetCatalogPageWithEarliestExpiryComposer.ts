import { IMessageComposer } from '@nitrots/api';

export class GetCatalogPageWithEarliestExpiryComposer implements IMessageComposer<ConstructorParameters<typeof GetCatalogPageWithEarliestExpiryComposer>>
{
    private _data: ConstructorParameters<typeof GetCatalogPageWithEarliestExpiryComposer>;

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
