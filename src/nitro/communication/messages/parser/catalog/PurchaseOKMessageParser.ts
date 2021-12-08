import { IMessageDataWrapper, IMessageParser } from '../../../../../core';
import { PurchaseOKMessageOfferData } from '../../incoming/catalog/PurchaseOKMessageOfferData';

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
