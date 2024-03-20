import { IMessageComposer } from '@nitrots/api';

export class GetHabboBasicMembershipExtendOfferComposer implements IMessageComposer<ConstructorParameters<typeof GetHabboBasicMembershipExtendOfferComposer>>
{
    private _data: ConstructorParameters<typeof GetHabboBasicMembershipExtendOfferComposer>;

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
