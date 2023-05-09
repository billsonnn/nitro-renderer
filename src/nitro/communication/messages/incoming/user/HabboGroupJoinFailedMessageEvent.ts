import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { HabboGroupJoinFailedMessageParser } from '../../parser';

export class HabboGroupJoinFailedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, HabboGroupJoinFailedMessageParser);
    }

    public getParser(): HabboGroupJoinFailedMessageParser
    {
        return this.parser as HabboGroupJoinFailedMessageParser;
    }
}
