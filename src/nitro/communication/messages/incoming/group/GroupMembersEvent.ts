import { IMessageEvent, MessageEvent } from '../../../../../core';
import { GroupMembersParser } from '../../parser/group/GroupMembersParser';

export class GroupMembersEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GroupMembersParser);
    }

    public getParser(): GroupMembersParser
    {
        return this.parser as GroupMembersParser;
    }
}
