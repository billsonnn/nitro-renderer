import { IMessageDataWrapper } from '../../../../../core';
import { IMessageParser } from './../../../../../core';

export class SanctionStatusMessageParser implements IMessageParser
{
    private _Str_21269: boolean;
    private _Str_20966: boolean;
    private _Str_19378: string;
    private _Str_19998: number;
    private _Str_21197: string;
    private _Str_20631: string;
    private _Str_19322: number;
    private _Str_22000: string;
    private _Str_19157: number;
    private _Str_21458: boolean;
    private _Str_22154: string;

    public flush(): boolean
    {
        this._Str_21269 = false;
        this._Str_20966 = false;
        this._Str_19378 = null;
        this._Str_19998 = 0;
        this._Str_21197 = null;
        this._Str_20631 = null;
        this._Str_19322 = 0;
        this._Str_22000 = null;
        this._Str_19157 = 0;
        this._Str_21458 = false;
        this._Str_22154 = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._Str_21269 = wrapper.readBoolean();
        this._Str_20966 = wrapper.readBoolean();
        this._Str_19378 = wrapper.readString();
        this._Str_19998 = wrapper.readInt();

        wrapper.readInt();

        this._Str_21197 = wrapper.readString();
        this._Str_20631 = wrapper.readString();
        this._Str_19322 = wrapper.readInt();
        this._Str_22000 = wrapper.readString();
        this._Str_19157 = wrapper.readInt();

        wrapper.readInt();

        this._Str_21458 = wrapper.readBoolean();

        if(wrapper.bytesAvailable) this._Str_22154 = wrapper.readString();

        return true;
    }

    public get _Str_22957(): boolean
    {
        return this._Str_21269;
    }

    public get _Str_16442(): boolean
    {
        return this._Str_20966;
    }

    public get _Str_22691(): string
    {
        return this._Str_19378;
    }

    public get _Str_22497(): number
    {
        return this._Str_19998;
    }

    public get _Str_22005(): string
    {
        return this._Str_21197;
    }

    public get _Str_25720(): string
    {
        return this._Str_20631;
    }

    public get _Str_20904(): number
    {
        return this._Str_19322;
    }

    public get _Str_23024(): string
    {
        return this._Str_22000;
    }

    public get _Str_23610(): number
    {
        return this._Str_19157;
    }

    public get _Str_23177(): boolean
    {
        return this._Str_21458;
    }

    public get _Str_21248(): string
    {
        return this._Str_22154;
    }
}
