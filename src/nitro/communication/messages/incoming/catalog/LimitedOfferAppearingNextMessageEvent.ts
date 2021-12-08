import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { LimitedOfferAppearingNextMessageParser } from '../../parser';

export class LimitedOfferAppearingNextMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, LimitedOfferAppearingNextMessageParser);
    }

    public getParser(): LimitedOfferAppearingNextMessageParser
    {
        return this.parser as LimitedOfferAppearingNextMessageParser;
    }
}
