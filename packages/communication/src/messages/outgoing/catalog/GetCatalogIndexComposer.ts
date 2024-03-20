import { IMessageComposer } from '@nitrots/api';

export class GetCatalogIndexComposer implements IMessageComposer<ConstructorParameters<typeof GetCatalogIndexComposer>>
{
    private _data: ConstructorParameters<typeof GetCatalogIndexComposer>;

    constructor(mode: string)
    {
        this._data = [mode];
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
