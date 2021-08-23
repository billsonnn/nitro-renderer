import { IMessageDataWrapper, IMessageParser } from '../../../../../../core';

export class MarketplaceItemPostedParser implements IMessageParser
{
    private _result: number;

    public flush(): boolean
    {
        this._result = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._result = wrapper.readInt();

        return true;
    }

    public get result(): number
    {
        return this._result;
    }
}
