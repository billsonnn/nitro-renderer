import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';

export class _Str_6256 implements IMessageParser
{
    private _Str_6143: number;
    private _result: number;

    public flush(): boolean
    {
        this._Str_6143  = 0;
        this._result    = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._Str_6143  = wrapper.readInt();
        this._result    = wrapper.readInt();

        return true;
    }

    public get _Str_12769(): number
    {
        return this._Str_6143;
    }

    public get result(): number
    {
        return this._result;
    }
}