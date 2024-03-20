import { IMessageComposer } from '@nitrots/api';

export class UserCurrencyComposer implements IMessageComposer<ConstructorParameters<typeof UserCurrencyComposer>>
{
    private _data: ConstructorParameters<typeof UserCurrencyComposer>;

    constructor()
    {
        this._data = [];
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
