import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class DirectSMSClubBuyAvailableMessageParser implements IMessageParser
{
    private _available: boolean;
    private _pricePointUrl: string;
    private _market: string;
    private _lengthInDays: number;

    public flush(): boolean
    {
        this._available = false;
        this._pricePointUrl = null;
        this._market = null;
        this._lengthInDays = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._pricePointUrl = wrapper.readString();

        if(this._pricePointUrl !== '') this._available = true;

        this._market = wrapper.readString();
        this._lengthInDays = wrapper.readInt();

        return true;
    }

    public get available(): boolean
    {
        return this._available;
    }

    public get pricePointUrl(): string
    {
        return this._pricePointUrl;
    }

    public get market(): string
    {
        return this._market;
    }

    public get lengthInDays(): number
    {
        return this._lengthInDays;
    }
}
