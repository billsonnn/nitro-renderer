import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';

export class CatalogPurchaseFailedParser implements IMessageParser
{
    private _code: number;

    public flush(): boolean
    {
        this._code  = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._code = wrapper.readInt();

        return true;
    }

    public get code(): number
    {
        return this._code;
    }
}