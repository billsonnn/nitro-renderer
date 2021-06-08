import { AchievementData } from 'nitro-renderer/src/nitro/communication/messages/incoming/inventory/achievements/AchievementData';
import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';

export class AchievementsParser implements IMessageParser
{
    private _achievements: AchievementData[];
    private _Str_19269: string;

    public flush(): boolean
    {
        this._achievements  = [];
        this._Str_19269     = null;

        return true;
    }

    public parse(k: IMessageDataWrapper): boolean
    {
        if(!k) return false;

        this._achievements = [];

        let totalCount = k.readInt();

        while(totalCount > 0)
        {
            this._achievements.push(new AchievementData(k));

            totalCount--;
        }

        this._Str_19269 = k.readString();

        return true;
    }

    public get achievements(): AchievementData[]
    {
        return this._achievements;
    }

    public get _Str_16300(): string
    {
        return this._Str_19269;
    }
}
