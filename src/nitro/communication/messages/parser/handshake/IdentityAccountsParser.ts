import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class IdentityAccountsParser implements IMessageParser
{
    private _Str_8999: Map<number, string>;

    public flush(): boolean
    {
        if(this._Str_8999)
        {
            this._Str_8999 = new Map();
        }

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._Str_8999 = new Map();

        let totalCount = wrapper.readInt();

        while(totalCount > 0)
        {
            this._Str_8999.set(wrapper.readInt(), wrapper.readString());

            totalCount--;
        }

        return true;
    }

    public get Str_8999(): Map<number, string>
    {
        return this._Str_8999;
    }
}
