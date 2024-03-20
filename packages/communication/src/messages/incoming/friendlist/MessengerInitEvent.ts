import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { MessengerInitParser } from '../../parser';

export class MessengerInitEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MessengerInitParser);
    }

    public getParser(): MessengerInitParser
    {
        return this.parser as MessengerInitParser;
    }
}
