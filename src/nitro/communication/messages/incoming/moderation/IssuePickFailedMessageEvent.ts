import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { IssuePickFailedMessageParser } from '../../parser/moderation/IssuePickFailedMessageParser';

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
