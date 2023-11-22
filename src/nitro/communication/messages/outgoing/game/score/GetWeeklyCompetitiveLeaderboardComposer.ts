import { IMessageComposer } from '../../../../../../api';

export class GetWeeklyCompetitiveLeaderboardComposer implements IMessageComposer<ConstructorParameters<typeof GetWeeklyCompetitiveLeaderboardComposer>>
{
    private _data: ConstructorParameters<typeof GetWeeklyCompetitiveLeaderboardComposer>;

    constructor(k: number, _arg_2: number)
    {
        this._data = [ k, _arg_2 ];
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
