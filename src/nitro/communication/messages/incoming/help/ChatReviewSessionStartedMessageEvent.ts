import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { ChatReviewSessionStartedMessageParser } from '../../parser/help/ChatReviewSessionStartedMessageParser';

export class ChatReviewSessionStartedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ChatReviewSessionStartedMessageParser);
    }

    public getParser(): ChatReviewSessionStartedMessageParser
    {
        return this.parser as ChatReviewSessionStartedMessageParser;
    }
}
