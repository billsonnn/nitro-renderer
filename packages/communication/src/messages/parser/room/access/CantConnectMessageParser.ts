import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class CantConnectMessageParser implements IMessageParser
{
    public static REASON_FULL: number = 1;
    public static REASON_CLOSED: number = 2;
    public static REASON_QUEUE_ERROR: number = 3;
    public static REASON_BANNED: number = 4;

    private _reason: number;
    private _parameter: string;

    public flush(): boolean
    {
        this._reason = 0;
        this._parameter = '';

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._reason = wrapper.readInt();
        this._parameter = wrapper.readString();

        return true;
    }

    public get reason(): number
    {
        return this._reason;
    }

    public get parameter(): string
    {
        return this._parameter;
    }
}
