import { IMessageComposer } from '@nitrots/api';

export class FriendListUpdateComposer implements IMessageComposer<ConstructorParameters<typeof FriendListUpdateComposer>>
{
    private _data: ConstructorParameters<typeof FriendListUpdateComposer>;

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
