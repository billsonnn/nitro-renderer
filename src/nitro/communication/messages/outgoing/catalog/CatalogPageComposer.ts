import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class CatalogPageComposer implements IMessageComposer<ConstructorParameters<typeof CatalogPageComposer>>
{
    private _data: ConstructorParameters<typeof CatalogPageComposer>;

    constructor(pageId: number, offerId: number, catalogType: string)
    {
        this._data = [ pageId, offerId, catalogType ];
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