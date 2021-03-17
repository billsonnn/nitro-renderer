import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';
import { Achievement } from '../../../incoming/inventory/achievements/Achievement';

export class AchievementParser implements IMessageParser
{
    private _achievement: Achievement;

    public flush(): boolean
    {
        this._achievement = null;

        return true;
    }

    public parse(k: IMessageDataWrapper): boolean
    {
        if(!k) return false;

        this._achievement = new Achievement(k);

        return true;
    }

    public get achievement(): Achievement
    {
        return this._achievement;
    }
}