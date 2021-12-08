import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { FindFriendsProcessResultParser } from '../../parser/friendlist/FindFriendsProcessResultParser';

export class FindFriendsProcessResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FindFriendsProcessResultParser);
    }

    public getParser(): FindFriendsProcessResultParser
    {
        return this.parser as FindFriendsProcessResultParser;
    }
}
