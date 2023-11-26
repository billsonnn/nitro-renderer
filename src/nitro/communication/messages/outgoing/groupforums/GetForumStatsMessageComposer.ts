import { IMessageComposer } from '../../../../../api';

export class GetForumStatsMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetForumStatsMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetForumStatsMessageComposer>;

    constructor(groupId: number)
    {
        this._data = [groupId];
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
