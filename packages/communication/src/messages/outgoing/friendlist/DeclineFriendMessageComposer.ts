import { IMessageComposer } from '@nitrots/api';

export class DeclineFriendMessageComposer implements IMessageComposer<ConstructorParameters<typeof DeclineFriendMessageComposer>>
{
    private _data: ConstructorParameters<typeof DeclineFriendMessageComposer>;

    constructor(removeAll: boolean, ...userIds: number[])
    {
        this._data = [removeAll, userIds.length, ...userIds];
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
