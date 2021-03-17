import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';
import { Achievement } from '../../../incoming/inventory/achievements/Achievement';

export class AchievementsParser implements IMessageParser
{
    private _achievements: Achievement[];
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
            this._achievements.push(new Achievement(k));

            totalCount--;
        }

        this._Str_19269 = k.readString();

        return true;
    }

    public get achievements(): Achievement[]
    {
        return this._achievements;
    }

    public get _Str_16300(): string
    {
        return this._Str_19269;
    }
}