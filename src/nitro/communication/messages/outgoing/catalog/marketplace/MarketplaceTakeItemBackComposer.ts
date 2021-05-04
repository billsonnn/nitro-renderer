import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class MarketplaceTakeItemBackComposer implements IMessageComposer<ConstructorParameters<typeof MarketplaceTakeItemBackComposer>>
{
    private _data: ConstructorParameters<typeof MarketplaceTakeItemBackComposer>;

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
