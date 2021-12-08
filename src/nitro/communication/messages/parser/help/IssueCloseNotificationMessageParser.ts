import { IMessageDataWrapper, IMessageParser } from '../../../../../core';

export class IssueCloseNotificationMessageParser implements IMessageParser
{
    private _closeReason: number;

    public flush(): boolean
    {
        this._closeReason = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._closeReason = wrapper.readInt();

        return true;
    }

    public get closeReason(): number
    {
        return this._closeReason;
    }
}
