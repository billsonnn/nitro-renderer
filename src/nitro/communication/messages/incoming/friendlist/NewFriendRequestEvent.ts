import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { NewFriendRequestParser } from '../../parser';

export class NewFriendRequestEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NewFriendRequestParser);
    }

    public getParser(): NewFriendRequestParser
    {
        return this.parser as NewFriendRequestParser;
    }
}
