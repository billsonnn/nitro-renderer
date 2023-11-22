import { LeaderboardEntry } from '.';
import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class Game2LeaderboardParser implements IMessageParser
{
    private _gameTypeId: number;
    private _leaderBoard: LeaderboardEntry[];
    private _totalListSize: number;

    public flush(): boolean
    {
        this._gameTypeId = -1;
        this._leaderBoard = [];
        this._totalListSize = -1;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let totalLeaderboards: number = wrapper.readInt();

        while(totalLeaderboards > 0)
        {
            this._leaderBoard.push(new LeaderboardEntry(wrapper));
            totalLeaderboards--;
        }

        this._totalListSize = wrapper.readInt();
        this._gameTypeId = wrapper.readInt();

        return true;
    }

    public get gameTypeId(): number
    {
        return this._gameTypeId;
    }

    public get leaderboard(): LeaderboardEntry[]
    {
        return this._leaderBoard;
    }

    public get totalListSize(): number
    {
        return this._totalListSize;
    }
}
