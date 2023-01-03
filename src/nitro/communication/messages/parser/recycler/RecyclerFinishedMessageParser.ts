import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class RecyclerFinishedMessageParser implements IMessageParser
{
    private _recyclerFinishedStatus: number;
    private _prizeId: number;

    public flush(): boolean
    {
        this._recyclerFinishedStatus = -1;
        this._prizeId = 0;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._recyclerFinishedStatus = wrapper.readInt();
        this._prizeId = wrapper.readInt();

        return true;
    }

    public get recyclerFinishedStatus(): number
    {
        return this._recyclerFinishedStatus;
    }

    public get prizeId(): number
    {
        return this._prizeId;
    }
}
