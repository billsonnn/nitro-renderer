import { IMessageDataWrapper, IMessageParser } from '../../../../../core';

export class HabboBroadcastMessageParser implements IMessageParser
{
    private _message: string;

    public flush(): boolean
    {
        this._message = null;

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
