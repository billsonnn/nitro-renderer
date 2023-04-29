import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { RentableSpaceRentOkMessageParser } from '../../../parser';

export class RentableSpaceRentOkMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RentableSpaceRentOkMessageParser);
    }

    public getParser(): RentableSpaceRentOkMessageParser
    {
        return this.parser as RentableSpaceRentOkMessageParser;
    }
}
