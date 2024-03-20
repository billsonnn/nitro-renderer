import { IMessageComposer } from '@nitrots/api';

export class Game2GetWeeklyFriendsLeaderboardComposer implements IMessageComposer<ConstructorParameters<typeof Game2GetWeeklyFriendsLeaderboardComposer>>
{
    private _data: ConstructorParameters<typeof Game2GetWeeklyFriendsLeaderboardComposer>;

    constructor(k:number, _arg_2:number, _arg_3:number, _arg_4:number, _arg_5:number, _arg_6:number)
    {
        this._data = [ k, _arg_2, _arg_3, _arg_4, _arg_5, _arg_6 ];
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
