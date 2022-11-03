import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { HabboGroupDeactivatedMessageParser } from '../../parser';

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
