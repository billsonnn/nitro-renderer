import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';

export class MarketplaceCanMakeOfferResultParser implements IMessageParser
{
    private _tokenCount: number = null;
    private _result: number = null;

    public flush(): boolean
    {
        this._tokenCount = null;
        this._result = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._result = wrapper.readInt();
        this._tokenCount = wrapper.readInt();

        return true;
    }

    public get tokenCount(): number
    {
        return this._tokenCount;
    }

    public get resultCode(): number
    {
        return this._result;
    }
}
