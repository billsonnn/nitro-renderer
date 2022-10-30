import { IMessageComposer } from '../../../../../api';

export class FriendRequestQuestCompleteMessageComposer implements IMessageComposer<ConstructorParameters<typeof FriendRequestQuestCompleteMessageComposer>>
{
    private _data: ConstructorParameters<typeof FriendRequestQuestCompleteMessageComposer>;

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
