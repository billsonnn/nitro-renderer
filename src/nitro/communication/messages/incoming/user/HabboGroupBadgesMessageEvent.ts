import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { HabboGroupBadgesMessageParser } from '../../parser/user/HabboGroupBadgesMessageParser';

export class HabboGroupBadgesMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, HabboGroupBadgesMessageParser);
    }

    public getParser(): HabboGroupBadgesMessageParser
    {
        return this.parser as HabboGroupBadgesMessageParser;
    }
}
