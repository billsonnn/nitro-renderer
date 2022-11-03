import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { PollContentsParser } from '../../parser';

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
