import { IMessageComposer } from '@nitrots/api';

export class ShopTargetedOfferViewedComposer implements IMessageComposer<ConstructorParameters<typeof ShopTargetedOfferViewedComposer>>
{
    private _data: ConstructorParameters<typeof ShopTargetedOfferViewedComposer>;

    constructor(k: number, _arg_2: number)
    {
        this._data = [k, _arg_2];
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
