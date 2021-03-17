import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class AcceptFriendComposer implements IMessageComposer<ConstructorParameters<typeof AcceptFriendComposer>>
{
    private _data: ConstructorParameters<typeof AcceptFriendComposer>;

    constructor(...userIds: number[])
    {
        this._data = [ userIds.length, ...userIds ];
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