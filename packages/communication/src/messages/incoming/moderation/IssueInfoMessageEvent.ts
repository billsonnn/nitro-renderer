import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { IssueInfoMessageParser } from '../../parser';

export class IssueInfoMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, IssueInfoMessageParser);
    }

    public getParser(): IssueInfoMessageParser
    {
        return this.parser as IssueInfoMessageParser;
    }
}
