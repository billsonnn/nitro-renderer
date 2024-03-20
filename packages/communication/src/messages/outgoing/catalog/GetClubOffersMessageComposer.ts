import { IMessageComposer } from '@nitrots/api';

export class GetClubOffersMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetClubOffersMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetClubOffersMessageComposer>;

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
        this._data = null;
    }
}
