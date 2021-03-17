import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class CatalogRequestVipGiftsComposer implements IMessageComposer<ConstructorParameters<typeof CatalogRequestVipGiftsComposer>>
{
    private _data: ConstructorParameters<typeof CatalogRequestVipGiftsComposer>;

    constructor()
    {
        this._data = [ ];
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
