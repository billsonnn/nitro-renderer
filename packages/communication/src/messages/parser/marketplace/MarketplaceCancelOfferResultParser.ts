import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class MarketplaceCancelOfferResultParser implements IMessageParser
{
    private _offerId: number;
    private _success: boolean;

    public flush(): boolean
    {
        this._offerId = 0;
        this._success = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._offerId = wrapper.readInt();
        this._success = wrapper.readBoolean();

        return true;
    }

    public get offerId(): number
    {
        return this._offerId;
    }

    public get success(): boolean
    {
        return this._success;
    }
}
