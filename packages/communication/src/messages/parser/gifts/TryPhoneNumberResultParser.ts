import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class TryPhoneNumberResultParser implements IMessageParser
{
    private _resultCode: number;
    private _millisToAllowProcessReset: number;

    public flush(): boolean
    {
        this._resultCode = -1;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._resultCode = wrapper.readInt();
        this._millisToAllowProcessReset = wrapper.readInt();

        return true;
    }

    public get resultCode(): number
    {
        return this._resultCode;
    }

    public get millisToAllowProcessReset(): number
    {
        return this._millisToAllowProcessReset;
    }
}
