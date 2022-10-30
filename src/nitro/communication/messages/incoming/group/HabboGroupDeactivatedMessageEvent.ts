import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { HabboGroupDeactivatedMessageParser } from '../../parser/group/HabboGroupDeactivatedMessageParser';

export class HabboGroupDeactivatedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, HabboGroupDeactivatedMessageParser);
    }

    public getParser(): HabboGroupDeactivatedMessageParser
    {
        return this.parser as HabboGroupDeactivatedMessageParser;
    }
}
