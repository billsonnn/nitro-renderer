import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';

export class MarketplaceConfigParser implements IMessageParser
{
    private _enabled:boolean;
    private _commission:number;
    private _credits:number;
    private _advertisements:number;
    private _maximumPrice:number;
    private _minimumPrice:number;
    private _offerTime:number;
    private _displayTime:number;


    public get enabled():boolean
    {
        return this._enabled;
    }

    public get commission():number
    {
        return this._commission;
    }

    public get credits():number
    {
        return this._credits;
    }

    public get advertisements():number
    {
        return this._advertisements;
    }

    public get minimumPrice():number
    {
        return this._minimumPrice;
    }

    public get maximumPrice():number
    {
        return this._maximumPrice;
    }

    public get offerTime():number
    {
        return this._offerTime;
    }

    public get displayTime():number
    {
        return this._displayTime;
    }

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._enabled = wrapper.readBoolean();
        this._commission = wrapper.readInt();
        this._credits = wrapper.readInt();
        this._advertisements = wrapper.readInt();
        this._minimumPrice = wrapper.readInt();
        this._maximumPrice = wrapper.readInt();
        this._offerTime = wrapper.readInt();
        this._displayTime = wrapper.readInt();

        return true;
    }


}
