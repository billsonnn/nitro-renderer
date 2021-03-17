import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';

export class TradingAcceptParser implements IMessageParser
{
    private _userID: number;
    private _userAccepts: boolean;

    public flush(): boolean
    {
        this._userID        = -1;
        this._userAccepts   = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._userID        = wrapper.readInt();
        this._userAccepts   = (wrapper.readInt() > 0);

        return true;
    }

    public get _Str_4963(): number
    {
        return this._userID;
    }

    public get _Str_15794(): boolean
    {
        return this._userAccepts;
    }
}