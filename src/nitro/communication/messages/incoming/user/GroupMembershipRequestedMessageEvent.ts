import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { GroupMembershipRequestedMessageParser } from '../../parser';

export class GroupMembershipRequestedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GroupMembershipRequestedMessageParser);
    }

    public getParser(): GroupMembershipRequestedMessageParser
    {
        return this.parser as GroupMembershipRequestedMessageParser;
    }
}
