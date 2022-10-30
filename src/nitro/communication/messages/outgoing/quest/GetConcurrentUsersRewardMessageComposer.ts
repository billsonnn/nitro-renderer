import { IMessageComposer } from '../../../../../api';

export class GetConcurrentUsersRewardMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetConcurrentUsersRewardMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetConcurrentUsersRewardMessageComposer>;

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
