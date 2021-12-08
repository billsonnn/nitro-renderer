import { IMessageDataWrapper, IMessageParser } from '../../../../../core';

export class DirectSMSClubBuyAvailableMessageParser implements IMessageParser
{
    private _available: boolean;
    private _Str_16515: string;
    private _Str_22121: string;
    private _Str_21897: number;

    public flush(): boolean
    {
        this._available = false;
        this._Str_16515 = null;
        this._Str_22121 = null;
        this._Str_21897 = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._Str_16515 = wrapper.readString();

        if(this._Str_16515 !== '') this._available = true;

        this._Str_22121 = wrapper.readString();
        this._Str_21897 = wrapper.readInt();

        return true;
    }

    public get available(): boolean
    {
        return this._available;
    }

    public get _Str_26301(): string
    {
        return this._Str_16515;
    }

    public get _Str_26118(): string
    {
        return this._Str_22121;
    }

    public get _Str_26380(): number
    {
        return this._Str_21897;
    }
}
