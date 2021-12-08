import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { ChatReviewSessionResultsMessageParser } from '../../parser/help/ChatReviewSessionResultsMessageParser';

export class ChatReviewSessionResultsMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ChatReviewSessionResultsMessageParser);
    }

    public getParser(): ChatReviewSessionResultsMessageParser
    {
        return this.parser as ChatReviewSessionResultsMessageParser;
    }
}
