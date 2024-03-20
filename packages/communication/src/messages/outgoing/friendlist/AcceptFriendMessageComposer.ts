import { IMessageComposer } from '@nitrots/api';

export class AcceptFriendMessageComposer implements IMessageComposer<ConstructorParameters<typeof AcceptFriendMessageComposer>>
{
    private _data: ConstructorParameters<typeof AcceptFriendMessageComposer>;

    constructor(...userIds: number[])
    {
        this._data = [userIds.length, ...userIds];
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
