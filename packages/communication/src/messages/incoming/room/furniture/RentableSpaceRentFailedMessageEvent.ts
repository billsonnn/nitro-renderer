import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { RentableSpaceRentFailedMessageParser } from '../../../parser';

export class RentableSpaceRentFailedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RentableSpaceRentFailedMessageParser);
    }

    public getParser(): RentableSpaceRentFailedMessageParser
    {
        return this.parser as RentableSpaceRentFailedMessageParser;
    }
}
