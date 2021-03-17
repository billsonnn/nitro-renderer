import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class CatalogRequestVipOffersComposer implements IMessageComposer<ConstructorParameters<typeof CatalogRequestVipOffersComposer>>
{
    private _data: ConstructorParameters<typeof CatalogRequestVipOffersComposer>;

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
        this._data = null;
    }
}
