import { IObjectData } from '../../../../../room/object/data/IObjectData';

export class MarketplaceOwnItem
{
    private readonly _offerId:number;
    private readonly _furniId:number;
    private readonly _furniType:number;
    private readonly _extraData:string;
    private readonly _stuffData:IObjectData;
    private readonly _price:number;
    private readonly _status:number;
    private readonly _Str_12399:number = -1;
    private readonly _Str_5049:number;
    private readonly _Str_4620:number;


    constructor(offerId: number, furniId: number, furniType: number, extraData: string, stuffData: IObjectData, price: number, status: number, arg8: number, arg9: number, arg10:number = -1)
    {
        this._offerId = offerId;
        this._furniId = furniId;
        this._furniType = furniType;
        this._extraData = extraData;
        this._stuffData = stuffData;
        this._price = price;
        this._status = status;
        this._Str_12399 = arg8;
        this._Str_5049 = arg9;
        this._Str_4620 = arg10;
    }

    public get offerId():number
    {
        return this._offerId;
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

    public get status():number
    {
        return this._status;
    }

    public get _Str_5853():number
    {
        return this._Str_12399;
    }

    public get _Str_3925():number
    {
        return this._Str_5049;
    }

    public get _Str_4121():number
    {
        return this._Str_4620;
    }
}
