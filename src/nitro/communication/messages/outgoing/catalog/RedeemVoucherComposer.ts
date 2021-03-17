import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class CatalogRedeemVoucherComposer implements IMessageComposer<ConstructorParameters<typeof CatalogRedeemVoucherComposer>>
{
    private _data: ConstructorParameters<typeof CatalogRedeemVoucherComposer>;

    constructor(voucherCode: string)
    {
        this._data = [ voucherCode ];
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
