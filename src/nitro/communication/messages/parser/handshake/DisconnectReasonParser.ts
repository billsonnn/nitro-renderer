import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class DisconnectReasonParser implements IMessageParser
{
    private _reason: number;

    public flush(): boolean
    {
        this._reason = -1;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._reason = 0;

        if(wrapper.bytesAvailable)
        {
            this._reason = wrapper.readInt();
        }

        return true;
    }

    public get reason(): number
    {
        return this._reason;
    }
}
