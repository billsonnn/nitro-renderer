import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class GenericErrorParser implements IMessageParser
{
    private _errorCode: number;

    public flush(): boolean
    {
        this._errorCode = 0;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._errorCode = wrapper.readInt();

        return true;
    }

    public get errorCode(): number
    {
        return this._errorCode;
    }
}
