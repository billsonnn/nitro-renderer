import { IMessageComposer } from '@nitrots/api';

export class GetCatalogPageExpirationComposer implements IMessageComposer<ConstructorParameters<typeof GetCatalogPageExpirationComposer>>
{
    private _data: ConstructorParameters<typeof GetCatalogPageExpirationComposer>;

    constructor(k: string)
    {
        this._data = [k];
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
