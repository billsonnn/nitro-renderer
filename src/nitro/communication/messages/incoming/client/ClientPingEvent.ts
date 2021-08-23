import { IMessageEvent, MessageEvent } from '../../../../../core';
import { ClientPingParser } from '../../parser/client/ClientPingParser';

export class ClientPingEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ClientPingParser);
    }

    public getParser(): ClientPingParser
    {
        return this.parser as ClientPingParser;
    }
}
