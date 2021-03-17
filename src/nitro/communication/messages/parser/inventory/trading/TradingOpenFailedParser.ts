import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';

export class TradingOpenFailedParser implements IMessageParser
{
    public static _Str_18150: number = 7;
    public static _Str_18383: number = 8;

    private _reason: number;
    private _Str_10068: string;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._reason    = wrapper.readInt();
        this._Str_10068 = wrapper.readString();

        return true;
    }

    public get reason(): number
    {
        return this._reason;
    }

    public get _Str_17035(): string
    {
        return this._Str_10068;
    }
}