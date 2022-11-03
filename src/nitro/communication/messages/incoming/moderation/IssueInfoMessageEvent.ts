import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
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
