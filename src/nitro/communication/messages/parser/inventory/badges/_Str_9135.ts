import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';

export class _Str_9135 implements IMessageParser
{
    private _Str_10244: string;
    private _Str_22220: boolean;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._Str_10244 = wrapper.readString();
        this._Str_22220 = wrapper.readBoolean();

        return true;
    }

    public get _Str_25181(): string
    {
        return this._Str_10244;
    }

    public get _Str_25366(): boolean
    {
        return this._Str_22220;
    }
}