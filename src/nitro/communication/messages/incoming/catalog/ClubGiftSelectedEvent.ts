import { IMessageEvent, MessageEvent } from '../../../../../core';
import { ClubGiftInfoParser } from '../../parser';

export class ClubGiftSelectedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ClubGiftInfoParser);
    }

    public getParser(): ClubGiftInfoParser
    {
        return this.parser as ClubGiftInfoParser;
    }
}
