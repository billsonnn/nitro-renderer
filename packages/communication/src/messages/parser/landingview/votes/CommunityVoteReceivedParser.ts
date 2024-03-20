import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class CommunityVoteReceivedParser implements IMessageParser
{
    private _acknowledged: boolean;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;
        this._acknowledged = wrapper.readBoolean();
        return true;
    }

    public get acknowledged(): boolean
    {
        return this._acknowledged;
    }
}
