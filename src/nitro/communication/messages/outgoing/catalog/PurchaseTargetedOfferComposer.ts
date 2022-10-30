import { IMessageComposer } from '../../../../../api';

export class PurchaseTargetedOfferComposer implements IMessageComposer<ConstructorParameters<typeof PurchaseTargetedOfferComposer>>
{
    private _data: ConstructorParameters<typeof PurchaseTargetedOfferComposer>;

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
