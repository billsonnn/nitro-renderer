import { IMessageEvent, MessageEvent } from '../../../../../core';
import { FriendRequestsParser } from '../../parser/friendlist/FriendRequestsParser';

export class FriendRequestsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FriendRequestsParser);
    }

    public getParser(): FriendRequestsParser
    {
        return this.parser as FriendRequestsParser;
    }
}
