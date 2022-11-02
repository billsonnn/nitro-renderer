import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class GuideSessionErrorMessageParser implements IMessageParser
{
    public static readonly ERROR_GENERIC: number = 0;
    public static readonly ERROR_GUIDES_REJECT: number = 1;
    public static readonly ERROR_NOT_ENOUGH_GUIDES: number = 2;
    public static readonly ERROR_NOT_ENOUGH_VOTES: number = 3;
    public static readonly ERROR_NO_CHATLOG_FOUND: number = 4;

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
