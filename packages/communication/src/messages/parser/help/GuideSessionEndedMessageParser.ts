import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class GuideSessionEndedMessageParser implements IMessageParser
{
    private _endReason: number;

    public flush(): boolean
    {
        this._endReason = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._endReason = wrapper.readInt();

        return true;
    }

    public get endReason(): number
    {
        return this._endReason;
    }
}
