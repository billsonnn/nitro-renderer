import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class CatalogSelectClubGiftComposer implements IMessageComposer<ConstructorParameters<typeof CatalogSelectClubGiftComposer>>
{
    private _data: ConstructorParameters<typeof CatalogSelectClubGiftComposer>;

    constructor(itemName: string)
    {
        this._data = [ itemName ];
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
