import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { GameRewardWinnerEntry } from './GameRewardWinnerEntry';

export class WeeklyGameRewardWinnersParser implements IMessageParser
{
    private _gameTypeId: number;
    private _winners: GameRewardWinnerEntry[];

    public flush(): boolean
    {
        this._gameTypeId = -1;
        this._winners = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._gameTypeId = wrapper.readInt();
        let totalWinners: number = wrapper.readInt();

        while(totalWinners > 0)
        {
            this._winners.push(new GameRewardWinnerEntry(wrapper));
            totalWinners--;
        }

        return true;
    }

    public get gameTypeId(): number
    {
        return this._gameTypeId;
    }

    public get winners(): GameRewardWinnerEntry[]
    {
        return this._winners;
    }
}
