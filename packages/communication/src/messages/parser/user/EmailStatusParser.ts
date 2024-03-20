import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class EmailStatusParser implements IMessageParser
{
    private _email: string;
    private _isVerified: boolean;
    private _allowChange: boolean;

    public flush(): boolean
    {
        this._email = null;
        this._isVerified = false;
        this._allowChange = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._email = wrapper.readString();
        this._isVerified = wrapper.readBoolean();
        this._allowChange = wrapper.readBoolean();

        return true;
    }

    public get email(): string
    {
        return this._email;
    }

    public get isVerified(): boolean
    {
        return this._isVerified;
    }

    public get allowChange(): boolean
    {
        return this._allowChange;
    }
}
