import { IMessageComposer } from '@nitrots/api';

export class PurchaseVipMembershipExtensionComposer implements IMessageComposer<ConstructorParameters<typeof PurchaseVipMembershipExtensionComposer>>
{
    private _data: ConstructorParameters<typeof PurchaseVipMembershipExtensionComposer>;

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
        return;
    }
}
