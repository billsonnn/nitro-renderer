import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { AvailabilityTimeMessageParser } from '../../parser';

export class AvailabilityTimeMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AvailabilityTimeMessageParser);
    }

    public getParser(): AvailabilityTimeMessageParser
    {
        return this.parser as AvailabilityTimeMessageParser;
    }
}
