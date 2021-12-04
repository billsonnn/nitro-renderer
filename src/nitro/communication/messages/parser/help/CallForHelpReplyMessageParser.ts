import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';

export class CallForHelpReplyMessageParser implements IMessageParser
{
    private _message: string;

    flush(): boolean
    {
        this._message = null;
        return true;
    }

    parse(wrapper: IMessageDataWrapper): boolean
    {
        this._message = wrapper.readString();
        return true;
    }

    public get message(): string
    {
        return this._message;
    }
}
