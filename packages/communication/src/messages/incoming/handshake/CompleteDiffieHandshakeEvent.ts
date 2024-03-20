import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { CompleteDiffieHandshakeParser } from '../../parser';

export class CompleteDiffieHandshakeEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CompleteDiffieHandshakeParser);
    }

    public getParser(): CompleteDiffieHandshakeParser
    {
        return this.parser as CompleteDiffieHandshakeParser;
    }
}
