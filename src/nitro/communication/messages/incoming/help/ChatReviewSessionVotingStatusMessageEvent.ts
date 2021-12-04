import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { ChatReviewSessionVotingStatusMessageParser } from '../../parser/help/ChatReviewSessionVotingStatusMessageParser';

export class ChatReviewSessionVotingStatusMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ChatReviewSessionVotingStatusMessageParser);
    }

    public getParser(): ChatReviewSessionVotingStatusMessageParser
    {
        return this.parser as ChatReviewSessionVotingStatusMessageParser;
    }
}
