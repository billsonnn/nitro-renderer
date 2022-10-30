import { IMessageComposer } from '../../../../../api';

export class RedeemVoucherMessageComposer implements IMessageComposer<ConstructorParameters<typeof RedeemVoucherMessageComposer>>
{
    private _data: ConstructorParameters<typeof RedeemVoucherMessageComposer>;

    constructor(voucherCode: string)
    {
        this._data = [voucherCode];
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
