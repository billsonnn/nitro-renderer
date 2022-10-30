import { IMessageComposer } from '../../../../../../../api';

export class UserSubscriptionComposer implements IMessageComposer<ConstructorParameters<typeof UserSubscriptionComposer>>
{
    private _data: ConstructorParameters<typeof UserSubscriptionComposer>;

    constructor(type: string)
    {
        this._data = [type];
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
