import { PrizeLevelMessageData } from '.';
import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class RecyclerPrizesMessageParser implements IMessageParser
{
    private _prizeLevels: PrizeLevelMessageData[];

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let totalPrizeLevels: number = wrapper.readInt();
        this._prizeLevels = [];

        while(totalPrizeLevels > 0)
        {
            this._prizeLevels.push(new PrizeLevelMessageData(wrapper));
            totalPrizeLevels--;
        }

        return true;
    }

    public get prizeLevels(): PrizeLevelMessageData[]
    {
        return this._prizeLevels;
    }
}
