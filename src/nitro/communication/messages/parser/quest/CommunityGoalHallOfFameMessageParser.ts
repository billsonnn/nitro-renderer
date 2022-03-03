import { IMessageDataWrapper } from '../../../../../core';
import { CommunityGoalHallOfFameData } from '../../incoming/quest/CommunityGoalHallOfFameData';
import { IMessageParser } from './../../../../../core';

export class CommunityGoalHallOfFameMessageParser implements IMessageParser
{
    private _data: CommunityGoalHallOfFameData;

    public flush(): boolean
    {
        this._data = null;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._data = new CommunityGoalHallOfFameData(wrapper);
        return true;
    }

    public get data(): CommunityGoalHallOfFameData
    {
        return this._data;
    }
}
