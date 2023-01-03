import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
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
