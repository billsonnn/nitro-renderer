import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { GroupBadgePartsParser } from '../../parser/group/GroupBadgePartsParser';

export class GroupBadgePartsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GroupBadgePartsParser);
    }

    public getParser(): GroupBadgePartsParser
    {
        return this.parser as GroupBadgePartsParser;
    }
}
