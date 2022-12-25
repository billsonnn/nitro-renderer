import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class RentableSpaceStatusMessageParser implements IMessageParser
{
    private _Str_16670: boolean;
    private _renterId: number;
    private _Str_18360: string;
    private _Str_20575: boolean;
    private _Str_16491: number;
    private _Str_22009: number;
    private _price: number;

    public flush(): boolean
    {
        this._Str_16670 = false;
        this._renterId = -1;
        this._Str_18360 = null;
        this._Str_20575 = false;
        this._Str_16491 = -1;
        this._Str_22009 = -1;
        this._price = -1;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._Str_16670 = wrapper.readBoolean();
        this._Str_16491 = wrapper.readInt();
        this._Str_20575 = (this._Str_16491 === 0);
        this._renterId = wrapper.readInt();
        this._Str_18360 = wrapper.readString();
        this._Str_22009 = wrapper.readInt();
        this._price = wrapper.readInt();

        if(!this._Str_16670)
        {
            this._renterId = -1;
            this._Str_18360 = '';
        }

        return true;
    }

    public get _Str_22736(): boolean
    {
        return this._Str_16670;
    }

    public get renterId(): number
    {
        return this._renterId;
    }

    public get _Str_23275(): string
    {
        return this._Str_18360;
    }

    public get _Str_23603(): boolean
    {
        return this._Str_20575;
    }

    public get price(): number
    {
        return this._price;
    }

    public get _Str_24083(): number
    {
        return this._Str_22009;
    }

    public get _Str_25070(): number
    {
        return this._Str_16491;
    }
}
