import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';

export class CatalogRedeemVoucherErrorParser implements IMessageParser
{
    private _errorCode:string = '';

    public flush(): boolean
    {
        this._errorCode = '';
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._errorCode = wrapper.readString();

        return true;
    }

    public get errorCode():string
    {
        return this._errorCode;
    }
}