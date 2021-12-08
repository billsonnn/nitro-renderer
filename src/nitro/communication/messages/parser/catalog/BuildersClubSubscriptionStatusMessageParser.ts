import { IMessageDataWrapper } from '../../../../../core';
import { IMessageParser } from './../../../../../core';

export class BuildersClubSubscriptionStatusMessageParser implements IMessageParser
{
    private _Str_16456: number;
    private _Str_12494: number;
    private _Str_19123: number;
    private _Str_17298: number;

    public flush(): boolean
    {
        this._Str_16456 = 0;
        this._Str_12494 = 0;
        this._Str_19123 = 0;
        this._Str_17298 = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._Str_16456 = wrapper.readInt();
        this._Str_12494 = wrapper.readInt();
        this._Str_19123 = wrapper.readInt();

        if(wrapper.bytesAvailable) this._Str_17298 = wrapper.readInt();
        else this._Str_17298 = this._Str_16456;

        return true;
    }

    public get _Str_3709(): number
    {
        return this._Str_16456;
    }

    public get _Str_15864(): number
    {
        return this._Str_12494;
    }

    public get _Str_24094(): number
    {
        return this._Str_19123;
    }

    public get _Str_24379(): number
    {
        return this._Str_17298;
    }
}
