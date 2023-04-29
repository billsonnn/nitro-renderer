import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class RecyclerStatusMessageParser implements IMessageParser
{
    private _recyclerStatus: number;
    private _recyclerTimeoutSeconds: number;

    public flush(): boolean
    {
        this._recyclerStatus = -1;
        this._recyclerTimeoutSeconds = 0;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._recyclerStatus = wrapper.readInt();
        this._recyclerTimeoutSeconds = wrapper.readInt();

        return true;
    }

    public get recyclerStatus(): number
    {
        return this._recyclerStatus;
    }

    public get recyclerTimeoutSeconds(): number
    {
        return this._recyclerTimeoutSeconds;
    }
}
