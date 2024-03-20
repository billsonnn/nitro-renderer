import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class WiredValidationErrorParser implements IMessageParser
{
    private _info: string;

    public flush(): boolean
    {
        this._info = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._info = wrapper.readString();

        return true;
    }

    public get info(): string
    {
        return this._info;
    }
}
