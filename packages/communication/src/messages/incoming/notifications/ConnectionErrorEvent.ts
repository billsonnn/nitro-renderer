import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { ConnectionErrorMessageParser } from '../../parser/notifications/ConnectionErrorMessageParser';

export class ConnectionErrorEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ConnectionErrorMessageParser);
    }

    public getParser(): ConnectionErrorMessageParser
    {
        return this.parser as ConnectionErrorMessageParser;
    }
}
