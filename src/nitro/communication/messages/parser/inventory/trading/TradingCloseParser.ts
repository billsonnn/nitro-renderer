import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';

export class TradingCloseParser implements IMessageParser
{
    public static _Str_16410: number = 1;

    private _userId: number;
    private _reason: number;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._userId = wrapper.readInt();
        this._reason = wrapper.readInt();

        return true;
    }

    public get _Str_4963(): number
    {
        return this._userId;
    }

    public get reason(): number
    {
        return this._reason;
    }
}