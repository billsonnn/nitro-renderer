import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { IgnoreResultParser } from '../../parser';

export class IgnoreResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, IgnoreResultParser);
    }

    public getParser(): IgnoreResultParser
    {
        return this.parser as IgnoreResultParser;
    }
}
