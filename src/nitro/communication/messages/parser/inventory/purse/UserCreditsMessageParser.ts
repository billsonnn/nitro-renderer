import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class UserCreditsMessageParser implements IMessageParser
{
    private _balance: number;

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._balance = parseFloat(wrapper.readString());

        return true;
    }

    public flush(): boolean
    {
        return true;
    }

    public get balance(): number
    {
        return this._balance;
    }
}
