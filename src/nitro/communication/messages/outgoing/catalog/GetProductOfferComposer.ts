import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class GetProductOfferComposer implements IMessageComposer<ConstructorParameters<typeof GetProductOfferComposer>>
{
    private _data: ConstructorParameters<typeof GetProductOfferComposer>;

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
        return;
    }
}
