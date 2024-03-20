import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class MessageErrorParser implements IMessageParser
{
    private _clientMessageId: number;
    private _errorCode: number;

    public flush(): boolean
    {
        this._clientMessageId = 0;
        this._errorCode = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._clientMessageId = wrapper.readInt();
        this._errorCode = wrapper.readInt();

        return true;
    }

    public get clientMessageId(): number
    {
        return this._clientMessageId;
    }

    public get errorCode(): number
    {
        return this._errorCode;
    }
}
