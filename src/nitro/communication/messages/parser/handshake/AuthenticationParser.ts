import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';

export class AuthenticationParser implements IMessageParser
{
    private _sso: string;

    public flush(): boolean
    {
        this._sso = null;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._sso = wrapper.readString();

        return true;
    }

    public get sso(): string
    {
        return this._sso;
    }
}
