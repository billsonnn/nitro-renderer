import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class MarketplaceSellItemComposer implements IMessageComposer<ConstructorParameters<typeof MarketplaceSellItemComposer>>
{
    private _data: ConstructorParameters<typeof MarketplaceSellItemComposer>;

    constructor(credits: number, arg2: number, itemId: number)
    {
        this._data = [credits, arg2, itemId];
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
