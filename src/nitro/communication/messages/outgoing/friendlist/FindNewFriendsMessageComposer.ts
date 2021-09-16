import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class FindNewFriendsMessageComposer implements IMessageComposer<ConstructorParameters<typeof FindNewFriendsMessageComposer>>
{
    private _data: ConstructorParameters<typeof FindNewFriendsMessageComposer>;

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
