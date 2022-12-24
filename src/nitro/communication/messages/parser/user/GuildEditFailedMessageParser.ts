import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class GuildEditFailedMessageParser implements IMessageParser
{
    public static readonly INSUFFICIENT_SUBSCRIPTION_LEVEL: number = 2;

    private _reason: number;

    public flush(): boolean
    {
        this._reason = -1;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._reason = wrapper.readInt();

        return true;
    }

    public get reason(): number
    {
        return this._reason;
    }
}
