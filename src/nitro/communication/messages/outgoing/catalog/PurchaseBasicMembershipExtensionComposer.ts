import { IMessageComposer } from '../../../../../api';

export class PurchaseBasicMembershipExtensionComposer implements IMessageComposer<ConstructorParameters<typeof PurchaseBasicMembershipExtensionComposer>>
{
    private _data: ConstructorParameters<typeof PurchaseBasicMembershipExtensionComposer>;

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
