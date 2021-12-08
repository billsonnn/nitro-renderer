import { IMessageDataWrapper } from '../../../../../core';
import { Nitro } from '../../../../Nitro';

export class TargetedOfferData
{
    protected _id: number;
    protected _identifier: string;
    protected _type: number;
    protected _title: string;
    protected _Str_1858: string;
    protected _Str_2991: string;
    protected _Str_18782: string;
    protected _productCode: string;
    protected _Str_9772: number;
    protected _expirationTime: number;
    protected _Str_3594: number;
    protected _Str_3539: number;
    protected _Str_2956: number;
    protected _Str_11962: string[];
    protected _Str_9163: number;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._Str_9163 = wrapper.readInt();
        this._id = wrapper.readInt();
        this._identifier = wrapper.readString();
        this._productCode = wrapper.readString();
        this._Str_3594 = wrapper.readInt();
        this._Str_3539 = wrapper.readInt();
        this._Str_2956 = wrapper.readInt();
        this._Str_9772 = wrapper.readInt();

        const time = wrapper.readInt();
        this._expirationTime = ((time > 0) ? ((time * 1000) + Nitro.instance.time) : 0);

        this._title = wrapper.readString();
        this._Str_1858 = wrapper.readString();
        this._Str_2991 = wrapper.readString();
        this._Str_18782 = wrapper.readString();
        this._type = wrapper.readInt();
        this._Str_11962 = [];

        let count = wrapper.readInt();

        while(count > 0)
        {
            this._Str_11962.push(wrapper.readString());

            count--;
        }
        return this;
    }

    public populate(offerData: TargetedOfferData)
    {
        if(!offerData) return;

        this._id = offerData.id;
        this._identifier = offerData.identifier;
        this._type = offerData.type;
        this._title = offerData.title;
        this._Str_1858 = offerData.description;
        this._Str_2991 = offerData.imageUrl;
        this._Str_18782 = offerData._Str_13452;
        this._productCode = offerData.productCode;
        this._Str_9772 = offerData.purchaseLimit;
        this._expirationTime = offerData.expirationTime;
        this._Str_3594 = offerData.priceInCredits;
        this._Str_3539 = offerData.priceInActivityPoints;
        this._Str_2956 = offerData.activityPointType;
        this._Str_11962 = offerData._Str_24978;
        this._Str_9163 = offerData._Str_11180;
    }

    public _Str_24338(k: number): void
    {
        this._Str_9772 = (this._Str_9772 - k);
    }

    public get id(): number
    {
        return this._id;
    }

    public get identifier(): string
    {
        return this._identifier;
    }

    public get type(): number
    {
        return this._type;
    }

    public get title(): string
    {
        return this._title;
    }

    public get description(): string
    {
        return this._Str_1858;
    }

    public get imageUrl(): string
    {
        return this._Str_2991;
    }

    public get _Str_13452(): string
    {
        return this._Str_18782;
    }

    public get productCode(): string
    {
        return this._productCode;
    }

    public get purchaseLimit(): number
    {
        return this._Str_9772;
    }

    public get expirationTime(): number
    {
        return this._expirationTime;
    }

    public get priceInCredits(): number
    {
        return this._Str_3594;
    }

    public get priceInActivityPoints(): number
    {
        return this._Str_3539;
    }

    public get activityPointType(): number
    {
        return this._Str_2956;
    }

    public get _Str_24978(): string[]
    {
        return this._Str_11962;
    }

    public get _Str_11180(): number
    {
        return this._Str_9163;
    }
}
