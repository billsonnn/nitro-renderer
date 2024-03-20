import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { FlatCreatedMessageParser } from '../../parser';

export class FlatCreatedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FlatCreatedMessageParser);
    }

    public getParser(): FlatCreatedMessageParser
    {
        return this.parser as FlatCreatedMessageParser;
    }
}
