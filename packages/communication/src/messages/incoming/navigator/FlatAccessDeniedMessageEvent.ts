import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { FlatAccessDeniedMessageParser } from '../../parser';

export class FlatAccessDeniedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FlatAccessDeniedMessageParser);
    }

    public getParser(): FlatAccessDeniedMessageParser
    {
        return this.parser as FlatAccessDeniedMessageParser;
    }
}
