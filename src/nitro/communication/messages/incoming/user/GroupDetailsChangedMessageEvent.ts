import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { GroupDetailsChangedMessageParser } from '../../parser';

export class GroupDetailsChangedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GroupDetailsChangedMessageParser);
    }

    public getParser(): GroupDetailsChangedMessageParser
    {
        return this.parser as GroupDetailsChangedMessageParser;
    }
}
