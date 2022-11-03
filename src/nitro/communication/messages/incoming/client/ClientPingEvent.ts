import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { ClientPingParser } from '../../parser';

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
