import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class JoinedQueueMessageParser implements IMessageParser
{
    private _gameTypeId:number;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._gameTypeId = wrapper.readInt();

        return true;
    }

    public get gameTypeId():number
    {
        return this._gameTypeId;
    }
}
