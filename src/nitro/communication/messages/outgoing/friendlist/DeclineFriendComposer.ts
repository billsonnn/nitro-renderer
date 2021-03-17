import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class DeclineFriendComposer implements IMessageComposer<ConstructorParameters<typeof DeclineFriendComposer>>
{
    private _data: ConstructorParameters<typeof DeclineFriendComposer>;

    constructor(removeAll: boolean, ...userIds: number[])
    {
        this._data = [ removeAll, userIds.length, ...userIds ];
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