import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
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
