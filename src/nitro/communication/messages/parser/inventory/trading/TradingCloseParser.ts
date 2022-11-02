import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class TradingCloseParser implements IMessageParser
{
    public static ERROR_WHILE_COMMIT: number = 1;

    private _userId: number;
    private _reason: number;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._userId = wrapper.readInt();
        this._reason = wrapper.readInt();

        return true;
    }

    public get userID(): number
    {
        return this._userId;
    }

    public get reason(): number
    {
        return this._reason;
    }
}
