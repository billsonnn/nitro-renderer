import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { FriendRequestData } from './FriendRequestData';

export class FriendRequestsParser implements IMessageParser
{
    private _totalRequests: number;
    private _requests: FriendRequestData[];

    public flush(): boolean
    {
        this._totalRequests = 0;
        this._requests = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._totalRequests = wrapper.readInt();

        let totalRequests = wrapper.readInt();

        while(totalRequests > 0)
        {
            this._requests.push(new FriendRequestData(wrapper));

            totalRequests--;
        }

        return true;
    }

    public get totalRequests(): number
    {
        return this._totalRequests;
    }

    public get requests(): FriendRequestData[]
    {
        return this._requests;
    }
}
