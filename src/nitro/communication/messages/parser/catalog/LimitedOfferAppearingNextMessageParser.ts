import { IMessageDataWrapper, IMessageParser } from '../../../../../core';

export class LimitedOfferAppearingNextMessageParser implements IMessageParser
{
    private _Str_6800: number;
    private _pageId: number;
    private _offerId: number;
    private _productType: string;

    public flush(): boolean
    {
        this._Str_6800 = -1;
        this._pageId = -1;
        this._offerId = -1;
        this._productType = '';

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._Str_6800 = wrapper.readInt();
        this._pageId = wrapper.readInt();
        this._offerId = wrapper.readInt();
        this._productType = wrapper.readString();

        return true;
    }

    public get _Str_23051(): number
    {
        return this._Str_6800;
    }

    public get pageId(): number
    {
        return this._pageId;
    }

    public get offerId(): number
    {
        return this._offerId;
    }

    public get productType(): string
    {
        return this._productType;
    }
}
