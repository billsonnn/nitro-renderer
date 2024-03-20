import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class TradingOpenFailedParser implements IMessageParser
{
    public static REASON_YOU_ARE_ALREADY_TRADING: number = 7;
    public static REASON_OTHER_USER_ALREADY_TRADING: number = 8;

    private _reason: number;
    private _otherUserName: string;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._reason = wrapper.readInt();
        this._otherUserName = wrapper.readString();

        return true;
    }

    public get reason(): number
    {
        return this._reason;
    }

    public get otherUserName(): string
    {
        return this._otherUserName;
    }
}
