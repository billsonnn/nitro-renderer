import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
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
