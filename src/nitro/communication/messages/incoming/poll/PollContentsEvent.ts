import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { PollContentsParser } from '../../parser/poll/PollContentsParser';

export class PollContentsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PollContentsParser);
    }

    public getParser(): PollContentsParser
    {
        return this.parser as PollContentsParser;
    }
}
