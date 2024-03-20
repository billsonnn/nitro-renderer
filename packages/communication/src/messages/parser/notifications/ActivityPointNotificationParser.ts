import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class ActivityPointNotificationParser implements IMessageParser
{
    private _amount: number;
    private _amountChanged: number;
    private _type: number;

    public flush(): boolean
    {
        this._amount = 0;
        this._amountChanged = 0;
        this._type = -1;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._amount = wrapper.readInt();
        this._amountChanged = wrapper.readInt();
        this._type = wrapper.readInt();

        return true;
    }

    public get amount(): number
    {
        return this._amount;
    }

    public get amountChanged(): number
    {
        return this._amountChanged;
    }

    public get type(): number
    {
        return this._type;
    }
}
