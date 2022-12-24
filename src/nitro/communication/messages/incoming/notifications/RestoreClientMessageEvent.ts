import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
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
