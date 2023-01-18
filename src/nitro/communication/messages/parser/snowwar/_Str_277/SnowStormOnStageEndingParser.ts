import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class SnowStormOnStageEndingParser implements IMessageParser
{
    private _habboGameId: number;

    public flush(): boolean
    {
        this._habboGameId = -1;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._habboGameId = wrapper.readInt();

        return true;
    }

    public get habboGameId(): number
    {
        return this._habboGameId;
    }
}
