import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { FriendListFragmentParser } from '../../parser/friendlist/FriendListFragmentMessageParser';

export class FriendListFragmentEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FriendListFragmentParser);
    }

    public getParser(): FriendListFragmentParser
    {
        return this.parser as FriendListFragmentParser;
    }
}
