import { IMessageComposer } from '../../../../../api';

export class GetCatalogPageComposer implements IMessageComposer<ConstructorParameters<typeof GetCatalogPageComposer>>
{
    private _data: ConstructorParameters<typeof GetCatalogPageComposer>;

    constructor(pageId: number, offerId: number, catalogType: string)
    {
        this._data = [pageId, offerId, catalogType];
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
