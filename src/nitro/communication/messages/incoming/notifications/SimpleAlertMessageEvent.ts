import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { SimpleAlertMessageParser } from '../../parser';

export class SimpleAlertMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, SimpleAlertMessageParser);
    }

    public getParser(): SimpleAlertMessageParser
    {
        return this.parser as SimpleAlertMessageParser;
    }
}
