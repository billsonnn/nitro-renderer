import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { BadgeReceivedParser } from '../../../parser';

export class BadgeReceivedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BadgeReceivedParser);
    }

    public getParser(): BadgeReceivedParser
    {
        return this.parser as BadgeReceivedParser;
    }
}
