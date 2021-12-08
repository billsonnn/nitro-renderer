import { IMessageDataWrapper, IMessageParser } from '../../../../../../core';

export class AchievementsScoreParser implements IMessageParser
{
    private _score: number;

    public flush(): boolean
    {
        this._score = 0;

        return true;
    }

    public parse(k: IMessageDataWrapper): boolean
    {
        if(!k) return false;

        this._score = k.readInt();

        return true;
    }

    public get score(): number
    {
        return this._score;
    }
}
