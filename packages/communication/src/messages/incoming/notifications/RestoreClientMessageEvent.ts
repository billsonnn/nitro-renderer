import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { RestoreClientMessageParser } from '../../parser';

export class RestoreClientMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RestoreClientMessageParser);
    }

    public getParser(): RestoreClientMessageParser
    {
        return this.parser as RestoreClientMessageParser;
    }
}
