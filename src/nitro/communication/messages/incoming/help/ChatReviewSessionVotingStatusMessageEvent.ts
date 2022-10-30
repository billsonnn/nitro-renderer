import { IMessageEvent } from '../../../../../api';
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
