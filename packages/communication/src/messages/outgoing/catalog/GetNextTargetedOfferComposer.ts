import { IMessageComposer } from '@nitrots/api';

export class GetNextTargetedOfferComposer implements IMessageComposer<ConstructorParameters<typeof GetNextTargetedOfferComposer>>
{
    private _data: ConstructorParameters<typeof GetNextTargetedOfferComposer>;

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
