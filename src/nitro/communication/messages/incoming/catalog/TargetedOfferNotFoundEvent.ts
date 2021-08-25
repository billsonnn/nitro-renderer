import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { TargetedOfferNotFoundParser } from '../../parser';

export class TargetedOfferNotFoundEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TargetedOfferNotFoundParser);
    }

    public getParser(): TargetedOfferNotFoundParser
    {
        return this.parser as TargetedOfferNotFoundParser;
    }
}
