import { IMessageComposer } from '../../../../../api';

export class GetBundleDiscountRulesetComposer implements IMessageComposer<ConstructorParameters<typeof GetBundleDiscountRulesetComposer>>
{
    private _data: ConstructorParameters<typeof GetBundleDiscountRulesetComposer>;

    constructor()
    {
        this._data = [];
    }

    dispose(): void
    {
        this._data = null;
    }

    public getMessageArray()
    {
        return this._data;
    }
}
