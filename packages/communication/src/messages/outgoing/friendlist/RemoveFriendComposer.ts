import { IMessageComposer } from '@nitrots/api';

export class RemoveFriendComposer implements IMessageComposer<ConstructorParameters<typeof RemoveFriendComposer>>
{
    private _data: ConstructorParameters<typeof RemoveFriendComposer>;

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
