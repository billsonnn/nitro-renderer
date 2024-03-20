import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { InfoFeedEnableMessageParser } from '../../parser';

export class InfoFeedEnableMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, InfoFeedEnableMessageParser);
    }

    public getParser(): InfoFeedEnableMessageParser
    {
        return this.parser as InfoFeedEnableMessageParser;
    }
}
