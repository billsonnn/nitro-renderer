import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class CatalogPurchaseGiftComposer implements IMessageComposer<ConstructorParameters<typeof CatalogPurchaseGiftComposer>>
{
    private _data: ConstructorParameters<typeof CatalogPurchaseGiftComposer>;

    constructor(pageId: number, itemId: number, extraData: string, receivingName: string, giftMessage: string, spriteId: number, color: number, ribbonId: number, anonymousGift: boolean)
    {
        this._data = [pageId, itemId, extraData, receivingName, giftMessage, spriteId, color, ribbonId, anonymousGift];
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
