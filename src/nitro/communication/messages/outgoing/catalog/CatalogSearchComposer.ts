import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class CatalogSearchComposer implements IMessageComposer<ConstructorParameters<typeof CatalogSearchComposer>>
{
    private _data: ConstructorParameters<typeof CatalogSearchComposer>;

    constructor(offerId: number)
    {
        this._data = [ offerId ];
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