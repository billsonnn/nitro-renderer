import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { DesktopViewParser } from '../../parser/desktop/DesktopViewParser';
import { FollowFriendFailedParser } from '../../parser/friendlist/FollowFriendFailedParser';

export class FollowFriendFailedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FollowFriendFailedParser);
    }

    public getParser(): DesktopViewParser
    {
        return this.parser as FollowFriendFailedParser;
    }
}
