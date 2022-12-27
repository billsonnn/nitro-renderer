import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class WelcomeGiftStatusParser implements IMessageParser
{
    private _email: string;
    private _isVerified: boolean;
    private _allowChange: boolean;
    private _furniId: number;
    private _requestedByUser: boolean;

    public flush(): boolean
    {
        this._email = null;
        this._isVerified = false;
        this._allowChange = false;
        this._furniId = -1;
        this._requestedByUser = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._email = wrapper.readString();
        this._isVerified = wrapper.readBoolean();
        this._allowChange = wrapper.readBoolean();
        this._furniId = wrapper.readInt();
        this._requestedByUser = wrapper.readBoolean();

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

    public get furniId(): number
    {
        return this._furniId;
    }

    public get requestedByUser(): boolean
    {
        return this._requestedByUser;
    }
}
