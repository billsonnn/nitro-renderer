import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
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
