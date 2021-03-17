import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class GetFriendRequestsComposer implements IMessageComposer<ConstructorParameters<typeof GetFriendRequestsComposer>>
{
    private _data: ConstructorParameters<typeof GetFriendRequestsComposer>;

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