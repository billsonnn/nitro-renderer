import { IMessageDataWrapper } from '../../../../../api';

export class TargetedOfferData
{
    protected _id: number;
    protected _identifier: string;
    protected _type: number;
    protected _title: string;
    protected _description: string;
    protected _imageUrl: string;
    protected _iconImageUrl: string;
    protected _productCode: string;
    protected _purchaseLimit: number;
    protected _expirationTime: number;
    protected _priceInCredits: number;
    protected _priceInActivityPoints: number;
    protected _activityPointType: number;
    protected _subProductCodes: string[];
    protected _trackingState: number;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._trackingState = wrapper.readInt();
        this._id = wrapper.readInt();
        this._identifier = wrapper.readString();
        this._productCode = wrapper.readString();
        this._priceInCredits = wrapper.readInt();
        this._priceInActivityPoints = wrapper.readInt();
        this._activityPointType = wrapper.readInt();
        this._purchaseLimit = wrapper.readInt();

        const time = wrapper.readInt();
        this._expirationTime = ((time > 0) ? ((time * 1000) + Date.now()) : 0);

        this._title = wrapper.readString();
        this._description = wrapper.readString();
        this._imageUrl = wrapper.readString();
        this._iconImageUrl = wrapper.readString();
        this._type = wrapper.readInt();
        this._subProductCodes = [];

        let count = wrapper.readInt();

        while(count > 0)
        {
            this._subProductCodes.push(wrapper.readString());

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
        this._description = offerData.description;
        this._imageUrl = offerData.imageUrl;
        this._iconImageUrl = offerData.iconImageUrl;
        this._productCode = offerData.productCode;
        this._purchaseLimit = offerData.purchaseLimit;
        this._expirationTime = offerData.expirationTime;
        this._priceInCredits = offerData.priceInCredits;
        this._priceInActivityPoints = offerData.priceInActivityPoints;
        this._activityPointType = offerData.activityPointType;
        this._subProductCodes = offerData.subProductCodes;
        this._trackingState = offerData.trackingState;
    }

    public purchase(k: number): void
    {
        this._purchaseLimit = (this._purchaseLimit - k);
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
        return this._description;
    }

    public get imageUrl(): string
    {
        return this._imageUrl;
    }

    public get iconImageUrl(): string
    {
        return this._iconImageUrl;
    }

    public get productCode(): string
    {
        return this._productCode;
    }

    public get purchaseLimit(): number
    {
        return this._purchaseLimit;
    }

    public get expirationTime(): number
    {
        return this._expirationTime;
    }

    public get priceInCredits(): number
    {
        return this._priceInCredits;
    }

    public get priceInActivityPoints(): number
    {
        return this._priceInActivityPoints;
    }

    public get activityPointType(): number
    {
        return this._activityPointType;
    }

    public get subProductCodes(): string[]
    {
        return this._subProductCodes;
    }

    public get trackingState(): number
    {
        return this._trackingState;
    }
}
