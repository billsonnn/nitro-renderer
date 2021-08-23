import { IMessageEvent, MessageEvent } from '../../../../../core';
import { NewConsoleMessageParser } from '../../parser/friendlist/NewConsoleMessageParser';

export class NewConsoleMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NewConsoleMessageParser);
    }

    public getParser(): NewConsoleMessageParser
    {
        return this.parser as NewConsoleMessageParser;
    }
}
