import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class InstantMessageErrorParser implements IMessageParser
{
    private _errorCode: number;
    private _userId: number;
    private _message: string;

    public flush(): boolean
    {
        this._errorCode = 0;
        this._userId = 0;
        this._message = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._errorCode = wrapper.readInt();
        this._userId = wrapper.readInt();
        this._message = wrapper.readString();

        return true;
    }

    public get errorCode(): number
    {
        return this._errorCode;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get message(): string
    {
        return this._message;
    }
}
