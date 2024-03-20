import { IMessageDataWrapper } from '@nitrots/api';

export class FireworkChargeData
{
    private _stuffId: number;
    private _charges: number;
    private _SafeStr_6935: number;
    private _SafeStr_6936: number;
    private _SafeStr_6518: number;
    private _SafeStr_7875: number;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._stuffId = wrapper.readInt();
        this._charges = wrapper.readInt();
        this._SafeStr_6935 = wrapper.readInt();
        this._SafeStr_6936 = wrapper.readInt();
        this._SafeStr_6518 = wrapper.readInt();
        this._SafeStr_7875 = wrapper.readInt();
    }

    public get stuffId(): number
    {
        return this._stuffId;
    }

    public get charges(): number
    {
        return this._charges;
    }

    public get _SafeStr_5946(): number
    {
        return this._SafeStr_6935;
    }

    public get _SafeStr_5944(): number
    {
        return this._SafeStr_6936;
    }

    public get _SafeStr_7876(): number
    {
        return this._SafeStr_7875;
    }

    public get _SafeStr_5945(): number
    {
        return this._SafeStr_6518;
    }
}
