import { IMessageComposer } from '../../../../../api';

export class GetForumStatsMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetForumStatsMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetForumStatsMessageComposer>;

    constructor(k: number)
    {
        this._data = [k];
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
