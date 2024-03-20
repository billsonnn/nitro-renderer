import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { ChatReviewSessionStartedMessageParser } from '../../parser';

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
