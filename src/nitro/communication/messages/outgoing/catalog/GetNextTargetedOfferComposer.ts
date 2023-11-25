import { IMessageComposer } from '../../../../../api';

export class GetNextTargetedOfferComposer implements IMessageComposer<ConstructorParameters<typeof GetNextTargetedOfferComposer>>
{
    private _data: ConstructorParameters<typeof GetNextTargetedOfferComposer>;

    constructor(targetedOfferId: number)
    {
        this._data = [targetedOfferId];
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
