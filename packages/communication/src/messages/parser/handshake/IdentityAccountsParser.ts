import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class IdentityAccountsParser implements IMessageParser
{
    private _accounts: Map<number, string>;

    public flush(): boolean
    {
        if(this._accounts)
        {
            this._accounts = new Map();
        }

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._accounts = new Map();

        let totalCount = wrapper.readInt();

        while(totalCount > 0)
        {
            this._accounts.set(wrapper.readInt(), wrapper.readString());

            totalCount--;
        }

        return true;
    }

    public get accounts(): Map<number, string>
    {
        return this._accounts;
    }
}
