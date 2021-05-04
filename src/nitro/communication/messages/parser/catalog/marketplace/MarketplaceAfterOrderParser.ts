import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';

export class MarketplaceAfterOrderParser implements IMessageParser
{

    private _result: number;
    private _offerId: number = -1;
    private _Str_20780: number = -1;
    private _Str_8508: number = -1;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._result = wrapper.readInt();
        this._offerId = wrapper.readInt();
        this._Str_20780 = wrapper.readInt();
        this._Str_8508 = wrapper.readInt();

        return true;
    }

    public get result():number
    {
        return this._result;
    }

    public get offerId():number
    {
        return this._offerId;
    }

    public get _Str_24839():number
    {
        return this._Str_20780;
    }

    public get _Str_7501():number
    {
        return this._Str_8508;
    }
}
