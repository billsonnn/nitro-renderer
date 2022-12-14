import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class LimitedOfferAppearingNextMessageParser implements IMessageParser
{
    private _appearsInSeconds: number;
    private _pageId: number;
    private _offerId: number;
    private _productType: string;

    public flush(): boolean
    {
        this._appearsInSeconds = -1;
        this._pageId = -1;
        this._offerId = -1;
        this._productType = '';

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._appearsInSeconds = wrapper.readInt();
        this._pageId = wrapper.readInt();
        this._offerId = wrapper.readInt();
        this._productType = wrapper.readString();

        return true;
    }

    public get appearsInSeconds(): number
    {
        return this._appearsInSeconds;
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
