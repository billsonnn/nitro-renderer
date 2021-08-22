import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';

export class ModeratorMessageParser implements IMessageParser
{
    private _message: string;
    private _link: string;

    public flush(): boolean
    {
        this._message   = null;
        this._link      = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._message   = wrapper.readString();
        this._link      = wrapper.readString();

        return true;
    }

    public get message(): string
    {
        return this._message;
    }

    public get link(): string
    {
        return this._link;
    }
}