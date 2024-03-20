import { IMessageComposer } from '@nitrots/api';

export class GetIsOfferGiftableComposer implements IMessageComposer<ConstructorParameters<typeof GetIsOfferGiftableComposer>>
{
    private _data: ConstructorParameters<typeof GetIsOfferGiftableComposer>;

    constructor(k: number)
    {
        this._data = [k];
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
