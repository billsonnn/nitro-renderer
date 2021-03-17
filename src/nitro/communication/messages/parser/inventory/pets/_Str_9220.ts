import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';

export class _Str_9220 implements IMessageParser
{
    private _Str_5792: number;
    private _Str_2388: number;

    public flush(): boolean
    {
        this._Str_2388 = -1;
        this._Str_5792 = -1;

        return true;
    }

    public parse(k: IMessageDataWrapper): boolean
    {
        this._Str_2388 = k.readInt();
        this._Str_5792 = k.readInt();

        return true;
    }

    public get _Str_16731(): number
    {
        return this._Str_5792;
    }

    public get _Str_2508(): number
    {
        return this._Str_2388;
    }
}