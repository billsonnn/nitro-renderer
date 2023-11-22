import { IMessageComposer } from '../../../../../../api';

export class GetFriendsWeeklyCompetitiveLeaderboardComposer implements IMessageComposer<ConstructorParameters<typeof GetFriendsWeeklyCompetitiveLeaderboardComposer>>
{
    private _data: ConstructorParameters<typeof GetFriendsWeeklyCompetitiveLeaderboardComposer>;

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
