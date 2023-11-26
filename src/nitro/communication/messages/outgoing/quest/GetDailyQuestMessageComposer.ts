import { IMessageComposer } from '../../../../../api';

export class GetDailyQuestMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetDailyQuestMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetDailyQuestMessageComposer>;

    constructor(canRefresh: boolean, index: number)
    {
        this._data = [canRefresh, index];
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
