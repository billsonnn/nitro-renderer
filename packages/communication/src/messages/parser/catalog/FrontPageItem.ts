import { IMessageDataWrapper } from '@nitrots/api';

export class FrontPageItem
{
    public static ITEM_CATALOGUE_PAGE: number = 0;
    public static ITEM_PRODUCT_OFFER: number = 1;
    public static ITEM_IAP: number = 2;

    private _type: number;
    private _position: number;
    private _itemName: string;
    private _itemPromoImage: string;
    private _catalogPageLocation: string;
    private _productCode: string;
    private _productOfferId: number;
    private _expirationTime: number;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this.flush();
        this.parse(wrapper);
    }

    public flush(): boolean
    {
        this._type = -1;
        this._position = null;
        this._itemName = null;
        this._itemPromoImage = null;
        this._catalogPageLocation = null;
        this._productCode = null;
        this._productOfferId = 0;
        this._expirationTime = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._position = wrapper.readInt();
        this._itemName = wrapper.readString();
        this._itemPromoImage = wrapper.readString();
        this._type = wrapper.readInt();

        switch(this._type)
        {
            case FrontPageItem.ITEM_CATALOGUE_PAGE:
                this._catalogPageLocation = wrapper.readString();
                break;
            case FrontPageItem.ITEM_PRODUCT_OFFER:
                this._productOfferId = wrapper.readInt();
                break;
            case FrontPageItem.ITEM_IAP:
                this._productCode = wrapper.readString();
                break;
        }

        const time = wrapper.readInt();

        this._expirationTime = ((time > 0) ? ((time * 1000) + 0) : 0); //GetTickerTime

        return true;
    }

    public get type(): number
    {
        return this._type;
    }

    public get position(): number
    {
        return this._position;
    }

    public get itemName(): string
    {
        return this._itemName;
    }

    public get itemPromoImage(): string
    {
        return this._itemPromoImage;
    }

    public get catalogPageLocation(): string
    {
        return this._catalogPageLocation;
    }

    public get productCode(): string
    {
        return this._productCode;
    }

    public get productOfferId(): number
    {
        return this._productOfferId;
    }

    public get expirationTime(): number
    {
        return this._expirationTime;
    }
}
