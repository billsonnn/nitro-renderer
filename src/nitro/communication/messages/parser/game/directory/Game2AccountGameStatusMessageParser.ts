import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class Game2AccountGameStatusMessageParser implements IMessageParser
{
    private _gameTypeId:number;
    private _freeGamesLeft:number;
    private _gamesPlayedTotal:number;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._gameTypeId = wrapper.readInt();
        this._freeGamesLeft = wrapper.readInt();
        this._gamesPlayedTotal = wrapper.readInt();

        return true;
    }

    public get gameTypeId():number
    {
        return this._gameTypeId;
    }

    public get freeGamesLeft():number
    {
        return this._freeGamesLeft;
    }

    public get gamesPlayedTotal():number
    {
        return this._gamesPlayedTotal;
    }

    public get hasUnlimitedGames():boolean
    {
        return this._freeGamesLeft == -1;
    }

}
