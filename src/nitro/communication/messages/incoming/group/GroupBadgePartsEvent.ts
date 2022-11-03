import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { GroupBadgePartsParser } from '../../parser';

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
