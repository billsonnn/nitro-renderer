import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
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