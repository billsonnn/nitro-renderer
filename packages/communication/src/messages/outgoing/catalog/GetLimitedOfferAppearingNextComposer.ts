import { IMessageComposer } from '@nitrots/api';

export class GetLimitedOfferAppearingNextComposer implements IMessageComposer<ConstructorParameters<typeof GetLimitedOfferAppearingNextComposer>>
{
    private _data: ConstructorParameters<typeof GetLimitedOfferAppearingNextComposer>;

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
        this._data = null;
    }
}
