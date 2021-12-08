import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { GroupBadgesParser } from '../../parser/group/GroupBadgesParser';

export class GroupBadgesEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GroupBadgesParser);
    }

    public getParser(): GroupBadgesParser
    {
        return this.parser as GroupBadgesParser;
    }
}
