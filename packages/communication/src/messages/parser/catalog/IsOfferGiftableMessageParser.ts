import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class IsOfferGiftableMessageParser implements IMessageParser
{
    private _offerId: number;
    private _isGiftable: boolean;

    public flush(): boolean
    {
        this._offerId = 0;
        this._isGiftable = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._offerId = wrapper.readInt();
        this._isGiftable = wrapper.readBoolean();

        return true;
    }

    public get offerId(): number
    {
        return this._offerId;
    }

    public get isGiftable(): boolean
    {
        return this._isGiftable;
    }
}
