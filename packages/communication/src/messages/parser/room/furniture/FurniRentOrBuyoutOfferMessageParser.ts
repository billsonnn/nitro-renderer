import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class FurniRentOrBuyoutOfferMessageParser implements IMessageParser
{
    private _isWallItem: boolean;
    private _furniTypeName: string;
    private _buyout: boolean;
    private _priceInCredits: number;
    private _priceInActivityPoints: number;
    private _activityPointType: number;

    public flush(): boolean
    {
        this._isWallItem = false;
        this._furniTypeName = null;
        this._buyout = false;
        this._priceInCredits = -1;
        this._priceInActivityPoints = -1;
        this._activityPointType = -1;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._isWallItem = wrapper.readBoolean();
        this._furniTypeName = wrapper.readString();
        this._buyout = wrapper.readBoolean();
        this._priceInCredits = wrapper.readInt();
        this._priceInActivityPoints = wrapper.readInt();
        this._activityPointType = wrapper.readInt();

        return true;
    }

    public get isWallItem(): boolean
    {
        return this._isWallItem;
    }

    public get furniTypeName(): string
    {
        return this._furniTypeName;
    }

    public get buyout(): boolean
    {
        return this._buyout;
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
}
