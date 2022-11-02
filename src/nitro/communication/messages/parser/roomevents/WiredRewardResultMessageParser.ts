import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class WiredRewardResultMessageParser implements IMessageParser
{
    private _reason: number;

    public flush(): boolean
    {
        this._reason = 0;

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
