import { IMessageDataWrapper, IMessageParser } from '../../../../../core';

export class IsOfferGiftableMessageParser implements IMessageParser
{
    private _offerId: number;
    private _Str_21271: boolean;

    public flush(): boolean
    {
        this._offerId = 0;
        this._Str_21271 = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._offerId = wrapper.readInt();
        this._Str_21271 = wrapper.readBoolean();

        return true;
    }

    public get offerId(): number
    {
        return this._offerId;
    }

    public get _Str_18028(): boolean
    {
        return this._Str_21271;
    }
}
