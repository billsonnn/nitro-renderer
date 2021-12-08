import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
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
