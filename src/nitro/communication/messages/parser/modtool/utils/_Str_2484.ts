import { _Str_8176 } from './_Str_8176';

export class _Str_2484
{
    public static _Str_5035: number = 1;
    public static _Str_8056: number = 2;
    public static _Str_17136: number = 3;

    private _Str_6036: number;
    private _state: number;
    private _Str_2629: number;
    private _Str_21044: number;
    private _issueAgeInMilliseconds: number;
    private _priority: number;
    private _Str_9559: number;
    private _Str_21130: number;
    private _Str_19722: string;
    private _Str_2797: number;
    private _Str_5502: string;
    private _Str_9859: number;
    private _Str_21393: string;
    private _message: string;
    private _Str_10679: number;
    private _Str_15205: _Str_8176[];
    private _disposed: boolean = false;
    private _Str_19084: number;

    constructor(k: number, _arg_2: number, _arg_3: number, _arg_4: number, _arg_5: number, _arg_6: number, _arg_7: number, _arg_8: number, _arg_9: string, _arg_10: number, _arg_11: string, _arg_12: number, _arg_13: string, _arg_14: string, _arg_15: number, _arg_16:_Str_8176[])
    {
        this._Str_6036 = k;
        this._state = _arg_2;
        this._Str_2629 = _arg_3;
        this._Str_21044 = _arg_4;
        this._issueAgeInMilliseconds = _arg_5;
        this._priority = _arg_6;
        this._Str_9559 = _arg_7;
        this._Str_21130 = _arg_8;
        this._Str_19722 = _arg_9;
        this._Str_2797 = _arg_10;
        this._Str_5502 = _arg_11;
        this._Str_9859 = _arg_12;
        this._Str_21393 = _arg_13;
        this._message = _arg_14;
        this._Str_10679 = _arg_15;
        this._Str_15205 = _arg_16;
        this._Str_19084 = 0; //getTimer();
    }

    public get _Str_2869(): number
    {
        return this._Str_6036;
    }

    public get state(): number
    {
        return this._state;
    }

    public get _Str_2712(): number
    {
        return this._Str_2629;
    }

    public get _Str_7437(): number
    {
        return this._Str_21044;
    }

    public get issueAgeInMilliseconds(): number
    {
        return this._issueAgeInMilliseconds;
    }

    public get priority(): number
    {
        return this._priority;
    }

    public get _Str_16842(): number
    {
        return this._Str_9559;
    }

    public get _Str_19929(): number
    {
        return this._Str_21130;
    }

    public get _Str_19615(): string
    {
        return this._Str_19722;
    }

    public get _Str_2662(): number
    {
        return this._Str_2797;
    }

    public get _Str_5842(): string
    {
        return this._Str_5502;
    }

    public get _Str_5547(): number
    {
        return this._Str_9859;
    }

    public get _Str_22164(): string
    {
        return this._Str_21393;
    }

    public get message(): string
    {
        return this._message;
    }

    public get _Str_20325(): number
    {
        return this._Str_10679;
    }

    public get _Str_26050(): _Str_8176[]
    {
        return this._Str_15205;
    }

    public dispose(): void
    {

        if(this.disposed)
        {
            return;
        }
        for(const k of this._Str_15205)
        {
            k.dispose();
        }
        this._Str_15205 = [];
        this._disposed = true;
    }

    public get disposed(): boolean
    {
        return this._disposed;
    }

    public _Str_15885(k: number): string
    {
        const _local_2: number = (((this._issueAgeInMilliseconds + k) - this._Str_19084) / 1000);
        const _local_3: number = (_local_2 / 60);
        const _local_4: number = (_local_3 % 60);
        const _local_5: number = (_local_3 / 60);
        const _local_6: string = (((_local_4 < 10) ? '0' : '') + _local_4);
        const _local_7: string = (((_local_5 < 10) ? '0' : '') + _local_5);
        return (_local_7 + ':') + _local_6;
    }
}
