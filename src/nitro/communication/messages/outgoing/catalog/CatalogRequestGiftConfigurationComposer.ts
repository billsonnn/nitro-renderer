import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class CatalogRequestGiftConfigurationComposer implements IMessageComposer<ConstructorParameters<typeof CatalogRequestGiftConfigurationComposer>>
{
    private _data: ConstructorParameters<typeof CatalogRequestGiftConfigurationComposer>;

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
