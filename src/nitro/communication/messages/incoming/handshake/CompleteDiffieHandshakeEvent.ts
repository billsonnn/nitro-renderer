import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
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
