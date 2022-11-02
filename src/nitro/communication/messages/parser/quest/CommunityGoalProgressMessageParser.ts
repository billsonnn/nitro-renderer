import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { CommunityGoalData } from './CommunityGoalData';

export class CommunityGoalProgressMessageParser implements IMessageParser
{
    private _data: CommunityGoalData;

    public flush(): boolean
    {
        this._data = null;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._data = new CommunityGoalData(wrapper);
        return true;
    }

    public get data(): CommunityGoalData
    {
        return this._data;
    }
}
