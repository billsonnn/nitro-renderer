import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { PrizeData } from './PrizeData';

export class CommunityGoalEarnedPrizesMessageParser implements IMessageParser
{
    private _prizes: PrizeData[];

    public flush(): boolean
    {
        this._prizes = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        const count = wrapper.readInt();
        for(let i = 0; i < count; i++)
        {
            this._prizes.push(new PrizeData(wrapper));
        }
        return true;
    }

    public get prizes(): PrizeData[]
    {
        return this._prizes;
    }
}
