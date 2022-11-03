import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { FindFriendsProcessResultParser } from '../../parser';

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
