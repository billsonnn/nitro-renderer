import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
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
