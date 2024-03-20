import { IMessageComposer } from '@nitrots/api';

export class GetDailyQuestMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetDailyQuestMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetDailyQuestMessageComposer>;

    constructor(k: boolean, _arg_2: number)
    {
        this._data = [k, _arg_2];
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
