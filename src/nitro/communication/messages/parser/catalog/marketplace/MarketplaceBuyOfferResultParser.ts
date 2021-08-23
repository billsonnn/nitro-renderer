import { IMessageDataWrapper, IMessageParser } from '../../../../../../core';

export class MarketplaceBuyOfferResultParser implements IMessageParser
{
    private _result: number;
    private _newOfferId: number = -1;
    private _newPrice: number = -1;
    private _requestedOfferId: number = -1;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._result = wrapper.readInt();
        this._newOfferId = wrapper.readInt();
        this._newPrice = wrapper.readInt();
        this._requestedOfferId = wrapper.readInt();

        return true;
    }

    public get result():number
    {
        return this._result;
    }

    public get offerId():number
    {
        return this._newOfferId;
    }

    public get newPrice():number
    {
        return this._newPrice;
    }

    public get requestedOfferId():number
    {
        return this._requestedOfferId;
    }
}
