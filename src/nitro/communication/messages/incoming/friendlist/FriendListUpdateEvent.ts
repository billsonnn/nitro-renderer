import { IMessageEvent, MessageEvent } from '../../../../../core';
import { FriendListUpdateParser } from '../../parser/friendlist/FriendListUpdateParser';

export class FriendListUpdateEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FriendListUpdateParser);
    }

    public getParser(): FriendListUpdateParser
    {
        return this.parser as FriendListUpdateParser;
    }
}
