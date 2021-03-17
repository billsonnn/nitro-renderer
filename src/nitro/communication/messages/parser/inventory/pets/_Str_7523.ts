import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';

export class _Str_7523 implements IMessageParser
{
    public static _Str_8664: number = 1;
    public static _Str_9186: number = 2;
    public static _Str_22195: number = 3;

    private _state: number;
    private _Str_6614: number;
    private _Str_6649: number;

    public flush(): boolean
    {
        this._state     = 0;
        this._Str_6614  = 0;
        this._Str_6649  = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._state     = wrapper.readInt();
        this._Str_6614  = wrapper.readInt();
        this._Str_6649  = wrapper.readInt();

        return true;
    }

    public get state(): number
    {
        return this._state;
    }

    public get _Str_7440(): number
    {
        return this._Str_6614;
    }

    public get _Str_7663(): number
    {
        return this._Str_6649;
    }
}