import { IMessageComposer } from '@nitrots/api';

export class RequestFriendComposer implements IMessageComposer<ConstructorParameters<typeof RequestFriendComposer>>
{
    private _data: ConstructorParameters<typeof RequestFriendComposer>;

    constructor(username: string)
    {
        this._data = [username];
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
