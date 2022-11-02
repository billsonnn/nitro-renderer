import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { AchievementLevelUpData } from './AchievementLevelUpData';

export class AchievementNotificationMessageParser implements IMessageParser
{
    private _data: AchievementLevelUpData;

    public flush(): boolean
    {
        this._data = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._data = new AchievementLevelUpData(wrapper);

        return true;
    }

    public get data(): AchievementLevelUpData
    {
        return this._data;
    }
}
