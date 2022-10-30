import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { IssueInfoMessageParser } from '../../parser/moderation/IssueInfoMessageParser';

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
