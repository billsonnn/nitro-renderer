import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { ChatReviewSessionOfferedToGuideMessageParser } from '../../parser/help/ChatReviewSessionOfferedToGuideMessageParser';

export class ChatReviewSessionOfferedToGuideMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ChatReviewSessionOfferedToGuideMessageParser);
    }

    public getParser(): ChatReviewSessionOfferedToGuideMessageParser
    {
        return this.parser as ChatReviewSessionOfferedToGuideMessageParser;
    }
}
