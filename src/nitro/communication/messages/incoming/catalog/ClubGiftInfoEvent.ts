import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
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
