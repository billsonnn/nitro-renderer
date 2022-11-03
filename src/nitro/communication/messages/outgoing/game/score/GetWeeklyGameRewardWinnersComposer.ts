import { IMessageComposer } from '../../../../../../api';

export class GetWeeklyGameRewardWinnersComposer implements IMessageComposer<ConstructorParameters<typeof GetWeeklyGameRewardWinnersComposer>>
{
    private _data: ConstructorParameters<typeof GetWeeklyGameRewardWinnersComposer>;

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
