import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class FindNewFriendsComposer implements IMessageComposer<ConstructorParameters<typeof FindNewFriendsComposer>>
{
    private _data: ConstructorParameters<typeof FindNewFriendsComposer>;

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