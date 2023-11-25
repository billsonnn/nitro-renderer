import { IMessageComposer } from '../../../../../api';

export class SetTargetedOfferStateComposer implements IMessageComposer<ConstructorParameters<typeof SetTargetedOfferStateComposer>>
{
    private _data: ConstructorParameters<typeof SetTargetedOfferStateComposer>;

    constructor(offerId: number, offerTracking: number)
    {
        this._data = [offerId, offerTracking];
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
