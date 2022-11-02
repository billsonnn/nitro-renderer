import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { PurchaseOKMessageOfferData } from './PurchaseOKMessageOfferData';

export class PurchaseOKMessageParser implements IMessageParser
{
    private _offer: PurchaseOKMessageOfferData;

    public flush(): boolean
    {
        this._offer = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._offer = new PurchaseOKMessageOfferData(wrapper);

        return true;
    }

    public get offer(): PurchaseOKMessageOfferData
    {
        return this._offer;
    }
}
