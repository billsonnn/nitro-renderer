import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';

export class MarketplaceSellItemParser implements IMessageParser
{
    private _Str_19825: number = null;
    private _result: number = null;

    public flush(): boolean
    {
        this._Str_19825 = null;
        this._result = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._result = wrapper.readInt();
        this._Str_19825 = wrapper.readInt();

        return true;
    }

    public get _Str_24601(): number
    {
        return this._Str_19825;
    }

    public get _Str_3278(): number
    {
        return this._result;
    }


}
