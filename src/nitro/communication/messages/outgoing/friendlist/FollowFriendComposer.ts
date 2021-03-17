import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class FollowFriendComposer implements IMessageComposer<ConstructorParameters<typeof FollowFriendComposer>>
{
    private _data: ConstructorParameters<typeof FollowFriendComposer>;

    constructor(userId: number)
    {
        this._data = [ userId ];
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