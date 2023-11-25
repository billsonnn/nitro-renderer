import { IMessageComposer } from '../../../../../api';

export class PurchaseVipMembershipExtensionComposer implements IMessageComposer<ConstructorParameters<typeof PurchaseVipMembershipExtensionComposer>>
{
    private _data: ConstructorParameters<typeof PurchaseVipMembershipExtensionComposer>;

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
