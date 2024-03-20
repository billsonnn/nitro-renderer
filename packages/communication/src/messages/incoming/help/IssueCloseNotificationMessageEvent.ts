import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { IssueCloseNotificationMessageParser } from '../../parser';

export class IssueCloseNotificationMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, IssueCloseNotificationMessageParser);
    }

    public getParser(): IssueCloseNotificationMessageParser
    {
        return this.parser as IssueCloseNotificationMessageParser;
    }
}
