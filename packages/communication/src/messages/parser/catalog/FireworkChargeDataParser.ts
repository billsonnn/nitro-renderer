import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { FireworkChargeData } from './FireworkChargeData';

export class FireworkChargeDataParser implements IMessageParser
{
    private _fireworkChargeData: FireworkChargeData;

    public flush(): boolean
    {
        this._fireworkChargeData = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._fireworkChargeData = new FireworkChargeData(wrapper);

        return true;
    }

    public get fireworkChargeData(): FireworkChargeData
    {
        return this._fireworkChargeData;
    }
}
