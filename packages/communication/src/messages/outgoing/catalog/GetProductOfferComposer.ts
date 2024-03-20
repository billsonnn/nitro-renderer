import { IMessageComposer } from '@nitrots/api';

export class GetProductOfferComposer implements IMessageComposer<ConstructorParameters<typeof GetProductOfferComposer>>
{
    private _data: ConstructorParameters<typeof GetProductOfferComposer>;

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
        return;
    }
}
