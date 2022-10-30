import { IMessageComposer } from '../../../../../api';

export class RoomsWhereMyFriendsAreSearchMessageComposer implements IMessageComposer<ConstructorParameters<typeof RoomsWhereMyFriendsAreSearchMessageComposer>>
{
    private _data: ConstructorParameters<typeof RoomsWhereMyFriendsAreSearchMessageComposer>;

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
