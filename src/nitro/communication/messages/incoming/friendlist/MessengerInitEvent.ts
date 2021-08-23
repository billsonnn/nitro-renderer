import { IMessageEvent, MessageEvent } from '../../../../../core';
import { MessengerInitParser } from '../../parser/friendlist/MessengerInitParser';

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
