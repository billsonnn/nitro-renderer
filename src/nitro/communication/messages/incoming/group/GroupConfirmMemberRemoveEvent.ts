import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { GroupConfirmMemberRemoveParser } from '../../parser/group/GroupConfirmMemberRemoveParser';

export class GroupConfirmMemberRemoveEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GroupConfirmMemberRemoveParser);
    }

    public getParser(): GroupConfirmMemberRemoveParser
    {
        return this.parser as GroupConfirmMemberRemoveParser;
    }
}
