import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { AcceptFriendFailerData } from './AcceptFriendFailureData';

export class AcceptFriendResultParser implements IMessageParser
{
    private _failuers: AcceptFriendFailerData[];

    public flush(): boolean
    {
        this._failuers = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let totalFailures = wrapper.readInt();

        while(totalFailures > 0)
        {
            this._failuers.push(new AcceptFriendFailerData(wrapper));

            totalFailures--;
        }

        return true;
    }

    public get failures(): AcceptFriendFailerData[]
    {
        return this._failuers;
    }
}
