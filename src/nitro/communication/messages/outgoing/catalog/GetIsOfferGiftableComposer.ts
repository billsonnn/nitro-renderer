import { IMessageComposer } from '../../../../../api';

export class GetIsOfferGiftableComposer implements IMessageComposer<ConstructorParameters<typeof GetIsOfferGiftableComposer>>
{
    private _data: ConstructorParameters<typeof GetIsOfferGiftableComposer>;

    constructor(offerId: number)
    {
        this._data = [offerId];
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
