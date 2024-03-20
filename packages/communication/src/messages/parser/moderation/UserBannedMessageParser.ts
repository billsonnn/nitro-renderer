import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class UserBannedMessageParser implements IMessageParser
{
    private _message: string;

    public flush(): boolean
    {
        this._message = '';

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._message = wrapper.readString();

        return true;
    }

    public get message(): string
    {
        return this._message;
    }
}
