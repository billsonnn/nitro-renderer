import { IMessageDataWrapper, IMessageParser } from '../../../../../../core';
import { AchievementData } from '../../../incoming/inventory/achievements/AchievementData';

export class AchievementParser implements IMessageParser
{
    private _achievement: AchievementData;

    public flush(): boolean
    {
        this._achievement = null;

        return true;
    }

    public parse(k: IMessageDataWrapper): boolean
    {
        if(!k) return false;

        this._achievement = new AchievementData(k);

        return true;
    }

    public get achievement(): AchievementData
    {
        return this._achievement;
    }
}
