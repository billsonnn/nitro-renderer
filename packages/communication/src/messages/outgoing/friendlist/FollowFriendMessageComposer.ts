import { IMessageComposer } from '@nitrots/api';

export class FollowFriendMessageComposer implements IMessageComposer<ConstructorParameters<typeof FollowFriendMessageComposer>>
{
    private _data: ConstructorParameters<typeof FollowFriendMessageComposer>;

    constructor(userId: number)
    {
        this._data = [userId];
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
