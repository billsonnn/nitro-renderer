import { IObjectData } from '../../../../../room/object/data/IObjectData';

export class MarketplaceOfferData
{
    public static TYPE_LANDSCAPE:number = 1;
    public static TYPE_FLOOR:number = 2;

    private _offerId:number;
    private _furniId:number;
    private _furniType:number;
    private _extraData:string;
    private _stuffData:IObjectData;
    private _price:number;
    private _averagePrice:number;
    private _imageCallback:number;
    private _status:number;
    private _timeLeftMinutes:number = -1;
    private _offerCount:number;
    private _image:string;

    constructor(offerId:number, furniId:number, furniType:number, extraData:string, stuffData:IObjectData, price:number, status:number, averagePrice:number, offerCount:number=-1)
    {
        this._offerId = offerId;
        this._furniId = furniId;
        this._furniType = furniType;
        this._extraData = extraData;
        this._stuffData = stuffData;
        this._price = price;
        this._status = status;
        this._averagePrice = averagePrice;
        this._offerCount = offerCount;
    }



    public get offerId():number
    {
        return this._offerId;
    }

    public set offerId(k:number)
    {
        this._offerId = k;
    }

    public get furniId():number
    {
        return this._furniId;
    }

    public get furniType():number
    {
        return this._furniType;
    }

    public get extraData():string
    {
        return this._extraData;
    }

    public get stuffData():IObjectData
    {
        return this._stuffData;
    }

    public get price():number
    {
        return this._price;
    }

    public set price(k:number)
    {
        this._price = k;
    }


    public get _Str_3925():number
    {
        return this._averagePrice;
    }

    public get image():string
    {
        return this._image;
    }

    public set image(k:string)
    {

        this._image = k;
    }

    public set _Str_4774(k:number)
    {
        this._imageCallback = k;
    }

    public get _Str_4774():number
    {
        return this._imageCallback;
    }

    public get status():number
    {
        return this._status;
    }

    public get _Str_5853():number
    {
        return this._timeLeftMinutes;
    }

    public set _Str_5853(k:number)
    {
        this._timeLeftMinutes = k;
    }



    public get _Str_4121():number
    {
        return this._offerCount;
    }

    public set _Str_4121(k:number)
    {
        this._offerCount = k;
    }

    public get isUniqueLimitedItem():boolean
    {
        return (!(this.stuffData == null)) && (this.stuffData.uniqueSeries > 0);
    }
}
