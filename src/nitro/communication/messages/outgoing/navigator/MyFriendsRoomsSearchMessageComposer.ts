import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class MyFriendsRoomsSearchMessageComposer implements IMessageComposer<ConstructorParameters<typeof MyFriendsRoomsSearchMessageComposer>>
{
    private _data: ConstructorParameters<typeof MyFriendsRoomsSearchMessageComposer>;

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
