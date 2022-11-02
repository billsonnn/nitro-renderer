import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { ForumDataMessageParser } from '../../parser';

export class ForumDataMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ForumDataMessageParser);
    }

    public getParser(): ForumDataMessageParser
    {
        return this.parser as ForumDataMessageParser;
    }
}
