import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class TradingAcceptParser implements IMessageParser
{
    private _userID: number;
    private _userAccepts: boolean;

    public flush(): boolean
    {
        this._userID = -1;
        this._userAccepts = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._userID = wrapper.readInt();
        this._userAccepts = (wrapper.readInt() > 0);

        return true;
    }

    public get userID(): number
    {
        return this._userID;
    }

    public get userAccepts(): boolean
    {
        return this._userAccepts;
    }
}
