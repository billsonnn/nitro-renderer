import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { HotelMergeNameChangeParser } from '../../parser';

export class HotelMergeNameChangeEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, HotelMergeNameChangeParser);
    }

    public getParser(): HotelMergeNameChangeParser
    {
        return this.parser as HotelMergeNameChangeParser;
    }
}
