import { IMessageComposer } from '../../../../../../api';

export class Game2GetFriendsLeaderboardComposer implements IMessageComposer<ConstructorParameters<typeof Game2GetFriendsLeaderboardComposer>>
{
    private _data: ConstructorParameters<typeof Game2GetFriendsLeaderboardComposer>;

    constructor(k: number, _arg_2: number, _arg_3: number, _arg_4: number, _arg_5: number)
    {
        this._data = [ k, _arg_2, _arg_3, _arg_4, _arg_5 ];
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
