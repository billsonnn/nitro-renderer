import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { ClubGiftInfoParser } from '../../parser';

export class ClubGiftInfoEvent extends MessageEvent implements IMessageEvent
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
