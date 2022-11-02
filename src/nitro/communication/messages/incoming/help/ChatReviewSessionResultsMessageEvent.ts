import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { ChatReviewSessionResultsMessageParser } from '../../parser';

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
