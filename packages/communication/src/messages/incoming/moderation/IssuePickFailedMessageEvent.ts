import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { IssuePickFailedMessageParser } from '../../parser';

export class IssuePickFailedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, IssuePickFailedMessageParser);
    }

    public getParser(): IssuePickFailedMessageParser
    {
        return this.parser as IssuePickFailedMessageParser;
    }
}
