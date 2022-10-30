import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { HotelMergeNameChangeParser } from '../../parser/help/HotelMergeNameChangeParser';

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
