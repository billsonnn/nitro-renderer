import { IMessageDataWrapper, IMessageParser } from '../../../../../../../api';

export class UserCurrencyParser implements IMessageParser
{
    private _currencies: Map<number, number>;

    public flush(): boolean
    {
        this._currencies = new Map();

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let totalCurrencies = wrapper.readInt();

        while(totalCurrencies > 0)
        {
            this._currencies.set(wrapper.readInt(), wrapper.readInt());

            totalCurrencies--;
        }

        return true;
    }

    public get currencies(): Map<number, number>
    {
        return this._currencies;
    }
}
