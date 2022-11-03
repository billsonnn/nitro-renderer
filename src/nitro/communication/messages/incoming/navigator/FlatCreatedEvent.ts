import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
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
