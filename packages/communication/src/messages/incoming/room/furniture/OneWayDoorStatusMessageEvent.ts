import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { OneWayDoorStatusMessageParser } from '../../../parser';

export class OneWayDoorStatusMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, OneWayDoorStatusMessageParser);
    }

    public getParser(): OneWayDoorStatusMessageParser
    {
        return this.parser as OneWayDoorStatusMessageParser;
    }
}
