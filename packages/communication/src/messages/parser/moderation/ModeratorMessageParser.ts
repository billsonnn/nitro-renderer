import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class ModeratorMessageParser implements IMessageParser
{
    private _message: string;
    private _url: string;

    public flush(): boolean
    {
        this._message = '';
        this._url = '';

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._message = wrapper.readString();
        this._url = wrapper.readString();

        return true;
    }

    public get message(): string
    {
        return this._message;
    }

    public get url(): string
    {
        return this._url;
    }
}
