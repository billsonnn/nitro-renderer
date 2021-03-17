import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';
import { FriendRequestData } from '../../incoming/friendlist/FriendRequestData';

export class NewFriendRequestParser implements IMessageParser
{
    private _request: FriendRequestData;

    public flush(): boolean
    {
        this._request = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._request = new FriendRequestData(wrapper);

        return true;
    }

    public get request(): FriendRequestData
    {
        return this._request;
    }
}