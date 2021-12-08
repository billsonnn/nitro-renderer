import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { ChatReviewSessionDetachedMessageParser } from '../../parser/help/ChatReviewSessionDetachedMessageParser';

export class ChatReviewSessionDetachedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ChatReviewSessionDetachedMessageParser);
    }

    public getParser(): ChatReviewSessionDetachedMessageParser
    {
        return this.parser as ChatReviewSessionDetachedMessageParser;
    }
}
