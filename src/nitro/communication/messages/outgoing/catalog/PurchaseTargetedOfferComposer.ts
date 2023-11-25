import { IMessageComposer } from '../../../../../api';

export class PurchaseTargetedOfferComposer implements IMessageComposer<ConstructorParameters<typeof PurchaseTargetedOfferComposer>>
{
    private _data: ConstructorParameters<typeof PurchaseTargetedOfferComposer>;

    constructor(offerId: number, amount: number)
    {
        this._data = [offerId, amount];
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
