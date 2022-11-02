import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { TargetedOfferData } from './TargetedOfferData';

export class TargetedOfferParser implements IMessageParser
{
    private _data: TargetedOfferData;

    public flush(): boolean
    {
        this._data = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._data = new TargetedOfferData(wrapper);

        return true;
    }

    public get data(): TargetedOfferData
    {
        return this._data;
    }
}
