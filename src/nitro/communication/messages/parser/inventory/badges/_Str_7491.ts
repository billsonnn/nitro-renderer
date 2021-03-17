import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';

export class _Str_7491 implements IMessageParser
{
    private _badgeId: number;
    private _Str_2722: string;

    public flush(): boolean
    {
        this._badgeId   = 0;
        this._Str_2722  = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._badgeId   = wrapper.readInt();
        this._Str_2722  = wrapper.readString();

        return true;
    }

    public get badgeId(): number
    {
        return this._badgeId;
    }

    public get _Str_2494(): string
    {
        return this._Str_2722;
    }
}