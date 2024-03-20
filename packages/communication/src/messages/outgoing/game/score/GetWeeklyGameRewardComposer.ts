import { IMessageComposer } from '@nitrots/api';

export class GetWeeklyGameRewardComposer implements IMessageComposer<ConstructorParameters<typeof GetWeeklyGameRewardComposer>>
{
    private _data: ConstructorParameters<typeof GetWeeklyGameRewardComposer>;

    constructor(k: number)
    {
        this._data = [ k ];
    }

    dispose(): void
    {
        this._data = null;
    }

    public getMessageArray()
    {
        return this._data;
    }
}
