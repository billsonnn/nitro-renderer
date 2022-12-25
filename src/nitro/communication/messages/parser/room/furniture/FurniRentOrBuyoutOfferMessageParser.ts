import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class FurniRentOrBuyoutOfferMessageParser implements IMessageParser
{
    private _Str_4167: boolean;
    private _Str_6880: string;
    private _buyout: boolean;
    private _priceInCredits: number;
    private _priceInActivityPoints: number;
    private _activityPointType: number;

    public flush(): boolean
    {
        this._Str_4167 = false;
        this._Str_6880 = null;
        this._buyout = false;
        this._priceInCredits = -1;
        this._priceInActivityPoints = -1;
        this._activityPointType = -1;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._Str_4167 = wrapper.readBoolean();
        this._Str_6880 = wrapper.readString();
        this._buyout = wrapper.readBoolean();
        this._priceInCredits = wrapper.readInt();
        this._priceInActivityPoints = wrapper.readInt();
        this._activityPointType = wrapper.readInt();

        return true;
    }

    public get isWallItem(): boolean
    {
        return this._Str_4167;
    }

    public get _Str_17878(): string
    {
        return this._Str_6880;
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
