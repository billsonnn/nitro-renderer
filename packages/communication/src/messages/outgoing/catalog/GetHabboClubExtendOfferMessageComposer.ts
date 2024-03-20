import { IMessageComposer } from '@nitrots/api';

export class GetHabboClubExtendOfferMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetHabboClubExtendOfferMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetHabboClubExtendOfferMessageComposer>;

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
