import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { IssueCloseNotificationMessageParser } from '../../parser/help/IssueCloseNotificationMessageParser';

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
